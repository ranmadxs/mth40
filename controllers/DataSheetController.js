app.controller('DataSheetController', function ($http, $scope, $filter, $location, $rootScope, $q, $routeParams, requestUtil, properties, wh40KBaseSvc) {
    $scope.properties = properties;
    console.log("init", "DataSheetController");
    var promisedSvc = wh40KBaseSvc.loadAllCodex();
    $scope.codexList = {'status': "LOADING"};
    $scope.data = {
        selectedCodex: "Orks",
        findUnit: "boy",
        dataFind : []
    }
    promisedSvc.then(function (result) {
        userDetails = result;
        console.log("Ready All codex", "Result promise");
        $scope.codexList.status = "READY";
        //console.log(result);
        if (!$rootScope.$$phase) {
            $rootScope.$digest();
        }
    }, errHandler);

    $scope.eraseOption = function() {
        $scope.data.selectedCodex = 'none';
    };  
    
    $scope.findUnit = function () {
        console.log($scope.data.findUnit, "findUnit");
        $scope.data.dataFind = wh40KBaseSvc.findUnit($scope.data.selectedCodex, $scope.data.findUnit);
        
    };    
});
