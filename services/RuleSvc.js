app.service("ruleSvc", function (properties) {

    console.log("init", "ruleSvc");


    hasAbility = function ($weapon) {
        var res = false;
        if ($weapon.hasOwnProperty("abilities")) {
            res = true;
        }
        return res;
    };

    this.getAditionalMeleeHitRoll = function ($model, $force) {
        var aditional = 0;
        if ($force.hasOwnProperty("upgrades")) {
            var upgrades = $force.upgrades;
            upgrades.forEach(function (upgrade) {
                if (upgrade.description.includes("roll of 6")
                        && upgrade.description.includes("melee weapon")
                        && upgrade.description.includes("additional hit roll")) {
                    aditional = Number($model.characteristics.A) / 6;
                }
            });
        }
        return aditional;
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
