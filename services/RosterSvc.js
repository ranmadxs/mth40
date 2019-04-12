app.service("rosterSvc", function (properties, wh40KFactory, ruleSvc) {
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

    getSaveProb = function ($dice) {
        if ($dice <= 2) {
            $dice = 2;
        }
        if ($dice > 6) {
            return 0;
        }
        return 100 * (7 - $dice) / 6;
    };

    getDiceProb = function ($dice) {
        if ($dice <= 2) {
            $dice = 2;
        }
        if ($dice >= 6) {
            $dice = 6;
        }
        return 100 * (7 - $dice) / 6;
    };

    getProbWound = function ($strong, $taunt) {
        if (Number($strong) == $taunt) {
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
        var ret = Number($value);
        var factor = 1;
        if ($value.includes("x") || $value.includes("X")) {
            factor = $value.replace("x", "").replace("X", "");
            ret = Number($normal) * Number(factor);
        }
        if ($value.includes("\+")) {

            factor = $value.replace("+", "");
            ret = Number($normal) + Number(factor);
            //console.info($normal + "+" + factor + "="+ret);
        }
        return ret;
    };

    getImpact = function ($model, $weapon, $enemy, $force) {
        var ws = Number($model.characteristics.WS.replace("+", ""));
        var modifi = Number(ruleSvc.getModifierHit($weapon));
        var diceTotal = ws + modifi;
        //console.info(ws + " + " + modifi + "= " + diceTotal, $weapon.name);
        var prob = getDiceProb(diceTotal);
        var attacks = ruleSvc.getWeaponAttacks($model, $weapon);
        var aditionalHitRoll = ruleSvc.getAditionalMeleeHitRoll(attacks, $force, $weapon);
        var impact = {};
        impact['aditionalHitRoll'] = aditionalHitRoll * $model.number;
        //impact['aditionalHitRoll'] = 0;
        impact['hitRoll'] = $model.number * attacks;
        var total = impact['totalHitRoll'] = impact['hitRoll'] + impact['aditionalHitRoll'];
        impact['probability'] = prob;
        impact['average'] = prob * total / 100;

        return impact;
    };

    getWound = function ($model, $weapon, $enemy) {
        var probWound = getProbWound($weapon.S, $enemy.T);
        var isReroll = ruleSvc.isRerollWound($weapon);
        var wound = {
            'probability': probWound,
            'average': probWound * $weapon.impact.average / 100,
            'reroll': isReroll
        }
        var failed = $weapon.impact.average - wound.average;
        if (isReroll) {
            var reroll = probWound * failed / 100;
            //console.log($weapon.impact.average + " - " + wound.average + " = " + failed + " reroll=" + reroll, $weapon.name);
            wound.average = reroll + wound.average;
        }

        return wound;
    };

    getDamage = function ($model, $weapon, $enemy) {
        var save = Number($enemy.Save.replace("+", "")) - Number($weapon.AP);
        //console.info(save, $weapon.name);
        var salvations = $weapon.wound.average * getSaveProb(save) / 100;
        //console.info($weapon.wound.average, getSaveProb(save));
        var salvation = {
            'wound': $weapon.wound.average - salvations
        };
        var weaponDamage = ruleSvc.getWeaponDamage($weapon);
        salvation['damage'] = weaponDamage;
        salvation['average'] = weaponDamage * salvation['wound'];
        return salvation;
    };

    getUnitMelee = function (model, charXML, $enemy, $force) {
        var ws = model.characteristics.WS.replace("+", "");
        var total = model.number * model.characteristics.A;
        var s = model.characteristics.S;
        var weapons = [];
        var weapon = {'name': 'normal', 'S': s, 'D': 1, 'AP': 0};
        weapon['impact'] = getImpact(model, weapon, $enemy, $force);
        weapon['wound'] = getWound(model, weapon, $enemy);
        weapon['save'] = getDamage(model, weapon, $enemy);
        weapons.push(weapon);
        model.weapons.forEach(function (e) {
            //'probability': getProbWound(e.characteristics.S, 4),
            if (e.characteristics.Type === 'Melee') {
                var strong = e.characteristics.S;
                if (strong.toUpperCase() == "USER") {
                    strong = s;
                }
                strong = getAmplifierFunction(s, strong);
                var weapon = {'name': e.name, 'S': strong,
                    'abilities': e.characteristics.Abilities,
                    'D': e.characteristics.D,
                    'AP': e.characteristics.AP
                };
                weapon['impact'] = getImpact(model, weapon, $enemy, $force);
                weapon['wound'] = getWound(model, weapon, $enemy);
                weapon['save'] = getDamage(model, weapon, $enemy);
                weapons.push(weapon);

            }
        });
        var statistics = {
            'units': model.number,
            'attacks': model.characteristics.A,
            'weapons': weapons,
        };
        var melee = {'statistics': statistics};
        return melee;
    };

    getCategories = function ($charXML) {
        //console.info($charXML);
        var categories = {};
        var principalCat = jQuery($charXML).find("selection categories category[primary='true']").attr("name");
        categories["main"] = principalCat;
        return categories;
    };

    getChars = function ($charXML, $enemy, $force) {
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
            'weapons': weapons,
        };
        model.melee = getUnitMelee(model, $charXML, $enemy, $force);
        return model;
    };

    getUpgrades = function ($forceXML) {
        var upgrades = [];
        jQuery($forceXML).find("force selections selection[type='upgrade'] selections selection[type='upgrade'] profiles profile[profileTypeName='Abilities']").each(function (x) {
            //console.log(jQuery(this).attr("name"), jQuery(this).attr("id"));
            var selectObj = jQuery(this).find("profile characteristics characteristic");
            var upgrade = {'name': jQuery(this).attr("name"), 'description': selectObj.attr("value")};
            //console.info(selectObj.attr("value"));
            upgrades.push(upgrade);
        });
        return upgrades;
    };

    getForceUnits = function ($forceXML, $enemy, $force) {
        var units = [];
        jQuery($forceXML).find("force selections selection[type='unit']").each(function (x) {
            var models = [];
            var selectObj = jQuery(this).find("selections selection[type='model']");
            var character = {};
            var categories = getCategories(this);
            if (jQuery(selectObj).children().length > 0) {
                jQuery(selectObj).each(function (y) {
                    character = getChars(this, $enemy, $force);                    
                    models.push(character);
                });
            } else {
                character = getChars(this, $enemy, $force);
                models.push(character);
            }
            

            var unit = {
                'name': jQuery(this).attr('name'),
                'models': models,
                'categories' : categories
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
                            'upgrades': getUpgrades(this)
                        };
                        force["units"] = getForceUnits(this, rosterVO.enemy, force);
                        forces.push(force);
                    });
                    roster.forces = forces;
                });

                roster.costs = getRosterCost(rosterXML);
                resolve(roster);

            }, errHandler);
        });
    };
});
