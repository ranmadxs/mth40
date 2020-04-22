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
    $scope.contacts= [{
        id: 1,
        name: "Ben",
        age: 28
    }, {
        id: 2,
        name: "Sally",
        age: 24
    }, {
        id: 3,
        name: "John",
        age: 32
    }, {
        id: 4,
        name: "Jane",
        age: 40
    }];
        
    $scope.url = {
        'category': 'pages/roster/category.html?rnd=' + rndUrl(),
        'unit': 'pages/roster/unit.html?rnd=' + rndUrl(),
        'model': 'pages/roster/model.html?rnd=' + rndUrl(),
        'selections': 'pages/roster/selections.html?rnd=' + rndUrl(),
    }
    //var listTournaments = challongeSvc.listTournaments("pending");

    $scope.validarRoster = function () {
        console.debug("init", "validateRoster");
        $scope.data.roster.status = "VALIDATE";
        console.debug($scope.data.roster, "validateRoster");
        var formData = new FormData();
        formData.append('roster_json', JSON.stringify($scope.data.roster));
        formData.append('roster_file', $scope.rosterFile);
        $http({
            method: 'POST',
            url: 'http://localhost:4001/roster/validate?saveJson=false',
            headers: {
                'Content-Type': undefined,
            },
            data: formData           
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.data.roster = response.data;
        }, function errorCallback(response) {
            if (response.status = 401) { // If you have set 401
                console.error("ohohoh")
            }
        });
    }

    $scope.previewRoster = function () {
        console.debug("init", "previewRoster");
        $scope.data.roster.status = "UPLOADING";
        var promisedLoad = loadFile();
        promisedLoad.then(function (result) {
            var promisedSvc = rosterSvc.loadRosterFromFile($scope.data.roster);
            promisedSvc.then(function (result) {
                console.debug("Promise Then", "promisedSvc");
                $scope.data.roster.status = "READY";
                var rosterAux = jQuery.extend({}, $scope.data.roster, result);
                delete rosterAux['file'];
                $scope.data.roster = rosterAux;                
                console.log($scope.data.roster);
                if (!$rootScope.$$phase) {
                    $rootScope.$digest();
                }
                //console.debug($scope.data.roster);
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