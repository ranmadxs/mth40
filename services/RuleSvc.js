app.service("ruleSvc", function (properties) {

    console.log("init", "ruleSvc");


    hasAbility = function ($weapon) {
        var res = false;
        if ($weapon.hasOwnProperty("abilities")) {
            res = true;
        }
        return res;
    };

    this.getWeaponAttacks = function ($model, $weapon) {
        var attacks = $model.characteristics.A;        
        if (hasAbility($weapon)) {
            var ability = $weapon.abilities;
            if (ability.includes("2 additional attacks")) {
                attacks = 2;
            }
            if (ability.includes("only 3 attacks")) {
                attacks = 3;
            }            
        }
        return attacks;
    };

    this.getAditionalMeleeHitRoll = function ($attacks, $force, $weapon) {
        var aditional = 0;
        if ($force.hasOwnProperty("upgrades")) {
            var upgrades = $force.upgrades;
            upgrades.forEach(function (upgrade) {
                if (upgrade.description.includes("roll of 6")
                        && upgrade.description.includes("melee weapon")
                        && upgrade.description.includes("additional hit roll")) {
                    aditional = Number($attacks) / 6;
                }
            });
        }
        if (hasAbility($weapon)) {
            //console.info($weapon);
            var ability = $weapon.abilities;
            if (ability.includes("1 additional attack")) {
                aditional = aditional + 1;
            }
        }
        return aditional;
    };

    getDmgD3 = function ($dmg) {
        var retVal = $dmg * (6 / 3) / 6;
        //console.log(retVal, $dmg);
        return retVal;
    };

    probWeapon = function($dmg){
        var damage = 0;        
        if ($dmg == 3){
            for (i = 1; i <= $dmg; i++) { 
                damage = getDmgD3(i) + damage;    
            }
        }
        return damage;
    };

    this.getWeaponDamage = function ($weapon){
        var damage = 1;
        //console.info($weapon);
        var dmgStr = $weapon.D;
        if (isNaN(dmgStr) && dmgStr.includes("D")){
            //console.info(dmgStr, $weapon);
            var dmg = dmgStr.replace("D", "");
            
            damage = probWeapon(dmg);
        }else{
            damage = Number(dmgStr);
        }
        return damage;
    };

    this.isRerollWound = function ($weapon) {
        var res = false;
        if (hasAbility($weapon)) {
            //console.info($weapon);
            var ability = $weapon.abilities;
            if (ability.includes("reroll") && ability.includes("wound roll")) {
                res = true;
            }
        }

        return res;
    };

    getModifierHit = function ($weapon) {
        var mod = 0;
        if (hasAbility($weapon)) {
            var ability = $weapon.abilities;
            if (ability.includes("subtract") && ability.includes("hit roll")) {
                if (ability.includes("subtract 1")) {
                    mod = +1;
                }
            }
        }
        return mod;
    };


    this.getModifierHit = function ($weapon) {
        var ret = getModifierHit($weapon);

        return ret;
    };
});
