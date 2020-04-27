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
        'url': 'resources/xml_db/8th/roster/Mechanicus01.ros',
        'file': null,
        'enemy': enemy,
        'rosterFormat' : 'url'
    };

    rndUrl = function () {
        return Math.random() * 6;
    };

    $scope.data = {
        'roster': rosterVO,
        'enemy': enemy,
        'categories': ["HQ", "Troops", "Elites", "Fast Attack", "Heavy Support"],
        'help' : 'NO'
    };

    $scope['url'] = {
        'category': 'pages/roster/category.html?rnd=' + rndUrl(),
        'unit': 'pages/roster/unit.html?rnd=' + rndUrl(),
        'model': 'pages/roster/model.html?rnd=' + rndUrl()
    }

    $scope.getCharacteristic = function ($model, $charName) {
        return $model.characteristics[$charName];
    };

    $scope.getWeaponCharacteristics = function ($weapon, $charName) {
        return $weapon[$charName];
    };

    $scope.analizar = function () {
        console.debug("analizar " + $scope.data.roster.url);
        $scope.url.category = 'pages/roster/category.html?rnd=' + rndUrl();

        var promisedLoad = loadFile();
        promisedLoad.then(function (result) {
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
        }, errHandler);


    };

    loadFile = function () {
        console.debug("loadFile");
        return new Promise(function (resolve, reject) {
            var rosterFile = $scope.rosterFile;
            if ($scope.rosterFile) {
                console.debug("loadFrom File");
                var aReader = new FileReader();
                aReader.readAsText(rosterFile, "UTF-8");
                aReader.onload = function (evt) {
                    $scope.data.roster.file = aReader.result;
                    resolve("OK");
                }
            } else {
                console.debug("loadFrom Url");
                $scope.data.roster.file = null;
                resolve("OK");
            }
        });
    };

});