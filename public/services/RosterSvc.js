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
        var isReroll = ruleSvc.isRerollWound($weapon);
        var strong = $weapon.S;
        if (strong.toUpperCase() == "USER") {
            strong = $model.characteristics.S;
        }
        strong = getAmplifierFunction($model.characteristics.S, strong);
        var probWound = getProbWound(strong, $enemy.T);
        var wound = {
            'probability': probWound,
            'average': probWound * $weapon.impact.average / 100,
            'reroll': isReroll
        }
        var failed = $weapon.impact.average - wound.average;
        if (isReroll) {
            var reroll = probWound * failed / 100;
            console.log(strong + " [s]" + $weapon.impact.average + " - " + wound.average + " = " + failed + " reroll=" + reroll, $weapon.name);
            wound.average = reroll + wound.average;
        }

        return wound;
    };

    getDamage = function ($model, $weapon, $enemy) {
        var save = Number($enemy.Save.replace("+", "")) - Number($weapon.AP);
        //console.info(save, $weapon.name);
        var probSave = getSaveProb(save);
        var salvations = $weapon.wound.average * probSave / 100;
        //console.info($weapon.wound.average, getSaveProb(save));
        var salvation = {
            'wound': $weapon.wound.average - salvations,
            'probSave': probSave
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
        var weapon = {'name': 'normal', 'S': s, 'D': 1, 'AP': 0, 'Range': 'Melee', 'Type': 'Melee', 'Abilities': '-'};
        weapon['impact'] = getImpact(model, weapon, $enemy, $force);
        weapon['wound'] = getWound(model, weapon, $enemy);
        weapon['save'] = getDamage(model, weapon, $enemy);
        weapons.push(weapon);
        model.weapons.forEach(function (e) {
            //'probability': getProbWound(e.characteristics.S, 4),
            if (e.characteristics.Type === 'Melee') {
                var weapon = {'name': e.name,
                    'abilities': e.characteristics.Abilities,
                };
                properties.weapon_chars.forEach(function (char) {
                    weapon[char.name] = e.characteristics[char.name];
                });
                //console.log(weapon, weapon.name);
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
                'categories': categories
            };
            units.push(unit);
        });
        return units;
    };
    
    getModelCost = function ($modelXML) {
        var allCostsXML = jQuery($modelXML).find("selection costs cost");
        var costsXML = jQuery($modelXML).children("costs").children("cost");
        var pts = 0;
        var PL = 0;
        var CP = 0;
        
        jQuery(costsXML).each(function(x){
            if("CP" == jQuery(this).attr("name").trim()){
                CP = parseInt(jQuery(this).attr("value"));  
            }
        });
        
       jQuery(allCostsXML).each(function(x){
            if("pts" == jQuery(this).attr("name").trim()){
                pts = pts + parseFloat(jQuery(this).attr("value"));  
            }
            if("PL" == jQuery(this).attr("name").trim()){
                PL = PL + parseFloat(jQuery(this).attr("value"));
            }
        });
        return {
            'pts': pts,
            'PL': PL,
            'CP': CP,
        };
    }

    listSelectionUnit = function ($modelXML) {
        var selections = [];
        var selectionsXML = jQuery($modelXML).children('selections').children('selection');
        jQuery(selectionsXML).each(function (x){
            var selection = {
                'name' : jQuery(this).attr("name"),
                'type' : jQuery(this).attr("type"),
                'number' : parseInt(jQuery(this).attr("number")),
            }
            selections.push(selection);
        });
        return selections;
    }

    listProfileType = function ($modelXML, typeName) {
        var list = new Object();
        jQuery($modelXML).find("profiles profile[typeName='"+typeName+"']")
            .each(function (x) {
                var x2js = new X2JS();
                var json = x2js.xml2json(this);
                var characteristics = new Object();
                json.characteristics.characteristic.forEach(chr => {
                    characteristics[chr._name] = chr.__text;
                });
                var element = {
                    'name': json._name.trim(),
                    'characteristics': characteristics,
                };                
                list[json._name.trim()] = element;
            });
        return list;
    }

    listForceUnits = function ($forceXML) {
        var units = [];
        var subfaction = {};
        //jQuery($forceXML).find("force selections selection[type='model'], force selections selection[type='unit']")
        jQuery($forceXML).find("force selections selection")
            .each(function (x) {
            var category = jQuery(this).find("selection categories category[primary='true'][name!='Stratagems'][name!='Configuration']");
            var categoryPrimary = category.attr("primary");
            var categoryName = category.attr("name");
            if (categoryPrimary == "true") {
              console.log("[" + categoryName + "] " + jQuery(this).attr("name"));       
                if (!categoryName.includes(properties.no_type)) {
                    if(categoryName == "Configuration"){
                        console.log('Configuration iffffff');
                        var selectionConfigsObj = jQuery(this).find("selection selections selection");                        
                        var nameSubfaction = selectionConfigsObj.attr("name");
                        if(nameSubfaction) { 
                            subfaction['name'] = nameSubfaction;
                            console.log("**** Subfaction = " + nameSubfaction);
                        }
                    }
                    console.log(this);
                    var unit = {
                        'id': jQuery(this).attr('id').trim(),
                        'entryId': jQuery(this).attr('entryId').trim(),
                        'name': jQuery(this).attr('name').trim(),
                        'type': jQuery(this).attr('type').trim(),
                        'costs': getModelCost(this),
                        'selections': listSelectionUnit(this),
                        'weapons': listProfileType(this, 'Weapon'),
                        'categories': {
                            'main': categoryName
                        }
                    };
                    //console.log(unit);
                    if(properties.entity_type.includes(categoryName)){
                        units.push(unit);
                    }                    
                }
            }

        });
        var faction = {
            units: units,
            subfaction: subfaction,
        };        
        return faction;
    };


    this.loadRosterFromFile = function (rosterVO) {
        console.info("init->loadRosterFromFile");
        loadRoster = wh40KFactory.loadCodexFromFile(rosterVO.file, 'roster');
        var rosterXML;
        var roster = rosterVO;
        return new Promise(function (resolve, reject) {
            Promise.all([loadRoster]).then(values => {

                values.forEach(function (e) {
                    rosterXML = e.catalogue;
                    console.log(jQuery(rosterXML).find("roster"));
                    var forcesXML = jQuery(rosterXML).find("roster forces force");
                    var rosterName = rosterXML.attr("name").trim();
                    console.log(rosterName);
                    //console.debug(rosterXML, "loadRosterFromFile");
                    //console.debug(forcesXML, "loadRosterFromFile->forcesXML");
                    var forces = [];
                    jQuery(forcesXML).each(function (x) {
                        var nameForce = jQuery(this).attr("name").trim();
                        console.log(this);
                        //console.debug(nameForce, "loadRosterFromFile");
                        var forceUnits = listForceUnits(this);
                        var subfactionName = forceUnits.subfaction.name?forceUnits.subfaction.name:null;
                        var force = {
                            'name': nameForce,
                            'catalogueName': jQuery(this).attr("catalogueName").trim(),
                            'catalogueRevision': jQuery(this).attr("catalogueRevision").trim(),
                            'subFaction' : subfactionName,
                            'units': forceUnits.units
                        };

                        //console.log(force, "[FORCE]");
                        forces.push(force);                        
                        roster.forces = forces;
                    });
                    roster.forces = forces;
                    roster.name = rosterName;
                    roster.costs = getModelCost(rosterXML);
                    roster.gameSystemName = rosterXML.attr("gameSystemName").trim();
                    roster.gameSystemRevision = rosterXML.attr("gameSystemRevision").trim();
                });

                resolve(roster);
            }, errHandler);


        });
    };

    this.init = function (rosterVO) {
        console.info(rosterVO, "init");
        if (rosterVO.file != null) {
            loadRoster = wh40KFactory.loadCodexFromFile(rosterVO.file, 'roster');
        } else {
            loadRoster = wh40KFactory.loadCodexFromUrl(rosterVO.url, 'roster');
        }
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
