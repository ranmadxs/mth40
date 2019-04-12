app.controller('RosterController', function ($http, $scope, $filter, $location, $rootScope, $q, $routeParams, requestUtil, properties, rosterSvc) {
    $scope.properties = properties;
    console.info("init", "RosterController");

    var enemy = {
        'T': 4,
        'Save': '3+'
    };

    var rosterVO = {
        'status': 'LOADING',
        'codex': 'Orks',
        'name': 'Tipejoz Machaconez',
        'file': 'resources/xml_db/8th/roster/Tipejoz_Machaconez_orks.ros',
        'enemy': enemy
    };

    $scope.data = {
        'roster': rosterVO,
        'enemy': enemy,
        'categories': ["Fast Attack"]
    };

    $scope.getCharacteristic = function ($model, $charName) {
        return $model.characteristics[$charName];
    };

    $scope.getWeaponCharacteristics = function ($weapon, $charName) {
        return $weapon.characteristics[$charName];
    };

    $scope.analizar = function () {
        console.debug("data.roster.file=" + $scope.data.roster.file);
        var promisedSvc = rosterSvc.init($scope.data.roster);
        promisedSvc.then(function (result) {
            var response = result;
            console.info("Ready All roster load ", "Result promise");
            console.debug(response, "analizar")
            $scope.data.roster.status = "READY";
            var rosterAux = jQuery.extend({}, $scope.data.roster, response);
            $scope.data.roster = rosterAux;
            //console.log(result);w
            if (!$rootScope.$$phase) {
                $rootScope.$digest();
            }
        }, errHandler);
    };



});