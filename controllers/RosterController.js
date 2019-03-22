app.controller('RosterController', function ($http, $scope, $filter, $location, $rootScope, $q, $routeParams, requestUtil, properties, rosterSvc) {
    $scope.properties = properties;
    console.info("init", "RosterController");

    var rosterVO = {
        'status': 'LOADING',
        'codex': 'Orks',
        'name': 'Tipejoz Machaconez',
        'file': 'resources/xml_db/8th/roster/Tipejoz_Machaconez_orks.ros'
    };

    $scope.data = {
        'roster': rosterVO,
    }

    $scope.analizar = function () {
        console.debug("data.roster.file=" + $scope.data.roster.file);
        var promisedSvc = rosterSvc.init($scope.data.roster);
        promisedSvc.then(function (result) {
            response = result;
            console.log("Ready All roster load " + response, "Result promise");
            $scope.data.roster.status = "READY";
            //console.log(result);w
            if (!$rootScope.$$phase) {
                $rootScope.$digest();
            }
        }, errHandler);
    };



});