app.controller('RosterImportController', function ($http, $scope, $filter, $location, $rootScope, $q, $routeParams, requestUtil, properties, rosterSvc, challongeSvc) {
    console.info("init", "RosterImportController");
    $scope.properties = properties;
    rndUrl = function () {
        return Math.random() * 6;
    };
    var rosterVO = {
        'status': 'WAITING',
        'codex': null,
        'name': null,
        'url': null,
        'file': null
    };
    $scope.data = {
        'roster': rosterVO,
        'categories': properties.entity_type
    };
    console.log(properties.entity_type);
    $scope.url = {
        'category': 'pages/roster/category.html?rnd=' + rndUrl(),
        'unit': 'pages/roster/unit.html?rnd=' + rndUrl(),
        'model': 'pages/roster/model.html?rnd=' + rndUrl()
    }
    var listTournaments = challongeSvc.listTournaments("pending");
    $scope.subirRoster = function () {
        console.debug("init", "subirRoster");
        $scope.data.roster.status = "UPLOADING";
        var promisedLoad = loadFile();
        promisedLoad.then(function (result) {
            var promisedSvc = rosterSvc.loadRosterFromFile($scope.data.roster);
            promisedSvc.then(function (result) {
                console.debug("Promise Then", "promisedSvc");
                $scope.data.roster.status = "READY";
                var rosterAux = jQuery.extend({}, $scope.data.roster, result);
                $scope.data.roster = rosterAux;
                console.log(result);
                if (!$rootScope.$$phase) {
                    $rootScope.$digest();
                }
            }, errHandler);
            console.debug("promisedLoad=[" + result + "]", "subirRoster");
        }, errHandler);
    };

    loadFile = function () {
        console.debug("init", "loadFile");
        return new Promise(function (resolve, reject) {
            var rosterFile = $scope.rosterFile;
            if ($scope.rosterFile) {
                console.debug("loadFrom File");
                var aReader = new FileReader();
                aReader.readAsText(rosterFile, "UTF-8");
                aReader.onload = function (evt) {
                    $scope.data.roster.file = aReader.result;
                    resolve("OK");
                };
            } else {
                resolve("NOK");
            }
            console.debug("Return new Promise", "loadFile");
        });
    };
});