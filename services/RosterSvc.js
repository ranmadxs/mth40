app.service("rosterSvc", function (properties, wh40KFactory) {
    console.log("init", "rosterSvc");


    var loadRoster;
    var roster = {};

    getRosterCost = function ($rosterXML) {
        var costs = {
            'points': jQuery($rosterXML).find("roster costs cost[name='pts']").attr("value"),
            'PL': jQuery($rosterXML).find("roster costs cost[name*='PL']").attr("value"),
        };
        return costs;
    };

    getDiceProb = function ($dice) {
        return 100 * (7 - $dice) / 6;
    }

    getProbWound = function ($strong, $taunt) {
        if (Number($strong) === $taunt) {
            return getDiceProb(4);
        }
        if (Number($strong) >= 2 * $taunt) {
            return getDiceProb(2);
        }
        if (Number($strong) * 2 <= $taunt) {
            return getDiceProb(6);
        }
        if (Number($strong) > $taunt) {
            return getDiceProb(3);
        }
        if (Number($strong) < $taunt) {
            return getDiceProb(5);
        }
    };

    getWeapons = function (charXML) {
        var strWeapon = "selection selections selection[type='upgrade'] profiles profile[profileTypeName='Weapon']";
        var weapons = [];
        jQuery(charXML).find(strWeapon).each(function (x) {
            var charJson = {};
            var profileWeapon = this;
            properties.weapon_chars.forEach(function (char) {
                charJson[char.name] = jQuery(profileWeapon).find("profile characteristics characteristic[name='" + char.name + "']").attr("value");
            });
            var weapon = {
                'name': jQuery(this).attr("name"),
                'characteristics': charJson,
            };
            weapons.push(weapon);
        });
        return weapons;
    };

    getAmplifierFunction = function ($normal, $value) {
        var ret = $value;
        if ($value.includes("x") || $value.includes("X")) {
            ret = $normal * 2;
        }
        if ($value.includes("\+")) {
            ret = $normal + 2;
        }
        return ret;
    };

    getImpact = function ($model, $weapon, $enemy) {
        var ws = $model.characteristics.WS.replace("+", "");
        var prob = getDiceProb(ws);
        var total = $model.number * $model.characteristics.A;
        var impact = {
            'probability': prob,
            'average': prob * total / 100
        };
        return impact;
    }

    getWound = function ($model, $weapon, $enemy) {
        var probWound = getProbWound($weapon.S, $enemy.s);
        var wound = {
            'probability': probWound,
            'average': probWound * $weapon.impact.average / 100
        }
        return wound;
    }


    getUnitMelee = function (model, charXML, $enemy) {
        var ws = model.characteristics.WS.replace("+", "");
        var prob = getDiceProb(ws);
        var total = model.number * model.characteristics.A;
        var s = model.characteristics.S;
        var impact = {
            'probability': prob,
            'average': prob * total / 100
        };
        var weapons = [];
        var weapon = {'name': 'normal', 'S': s};
        weapon['impact'] = getImpact(model, weapon, $enemy);
        weapon['wound'] = getWound(model, weapon, $enemy);
        weapons.push(weapon);
        model.weapons.forEach(function (e) {
            //'probability': getProbWound(e.characteristics.S, 4),
            if (e.characteristics.Type === 'Melee') {
                //console.debug(e.characteristics);
                var strong = e.characteristics.S;
                strong = getAmplifierFunction(s, strong);
                var weapon = {'name': e.name, 'S': strong};
                weapon['impact'] = getImpact(model, weapon, $enemy);
                weapon['wound'] = getWound(model, weapon, $enemy);
                weapons.push(weapon);

            }
        });
        var statistics = {
            'total': total,
            'weapons': weapons,
        };
        var melee = {'statistics': statistics};
        return melee;
    };

    getChars = function ($charXML, $enemy) {
        //console.debug($charXML);
        var charJson = {};
        var characteristicsObj = jQuery($charXML).find("selection profiles profile[profileTypeName='Unit'] characteristics");
        properties.characteristics.forEach(function (char) {
            charJson[char.name] = jQuery(characteristicsObj).find("characteristics characteristic[name='" + char.name + "']").attr("value");
        });
        var weapons = getWeapons($charXML);
        var model = {
            'name': jQuery($charXML).attr('name'),
            'number': jQuery($charXML).attr('number'),
            'characteristics': charJson,
            'weapons': weapons
        };
        model.melee = getUnitMelee(model, $charXML, $enemy);
        return model;
    };

    getForceUnits = function ($forceXML, $enemy) {
        var units = [];
        jQuery($forceXML).find("force selections selection[type='unit']").each(function (x) {
            var models = [];
            var selectObj = jQuery(this).find("selection selection[type='model']");
            if (jQuery(selectObj).children().length > 0) {
                jQuery(selectObj).each(function (y) {
                    models.push(getChars(this, $enemy));
                });
            } else {
                /*
                 var characteristicsObj = jQuery(this).find("selection profiles profile[profileTypeName='Unit'] characteristics");
                 var model = {
                 'name': jQuery(this).attr('name'),
                 'number': jQuery(this).attr('number'),
                 'characteristics': getChars(characteristicsObj),
                 };
                 model.totals = {'melee': model.number * model.characteristics.A};
                 models.push(model);
                 */
                models.push(getChars(this, $enemy));
            }


            var unit = {
                'name': jQuery(this).attr('name'),
                'models': models
            };
            units.push(unit);
        });
        return units;
    };
    this.init = function (rosterVO) {
        loadRoster = wh40KFactory.loadCodex(rosterVO.codex, rosterVO.file, 'roster');
        var rosterXML;
        return new Promise(function (resolve, reject) {
            Promise.all([loadRoster]).then(values => {
                values.forEach(function (e) {
                    //listCodex[e.name] = e.catalogue;
                    rosterXML = e.catalogue;
                    //console.debug(rosterXML, "init");
                    var forcesXML = jQuery(rosterXML).find("roster forces force");
                    var forces = [];
                    jQuery(forcesXML).each(function (x) {
                        //console.debug(x, "init");
                        //console.debug(this, "init");
                        //var forceName = jQuery(characteristicsObj).find("characteristics characteristic[name='M']").attr("value");

                        var force = {
                            'name': jQuery(this).attr("name"),
                            'units': getForceUnits(this, rosterVO.enemy)
                        };
                        forces.push(force);
                    });
                    roster.forces = forces;
                });

                roster.costs = getRosterCost(rosterXML);
                resolve(roster);
                console.log("XD", "loadAllCodex");

            }, errHandler);
        });
    };
});
