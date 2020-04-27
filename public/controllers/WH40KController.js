app.controller('WH40KController', function($http, $scope, $filter, $location, $rootScope, $q, $routeParams, requestUtil, properties, wh40KBaseSvc) {
    $scope.properties = properties;
    console.log("init", "WH40KController");
    var promisedSvc = wh40KBaseSvc.loadAllCodex();
    $scope.codexList = {'status' : "LOADING"};
    promisedSvc.then(function(result) {
        userDetails = result;
        console.log("Ready All codex", "Result promise")
        $scope.codexList.status = "READY";
        //console.log(result);
	if(!$rootScope.$$phase) {
            $rootScope.$digest();
	}            
    }, errHandler);
    
  
    
});