/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//<entryLinks>
//<sharedSelectionEntries> -> 
app.controller('ShootingController', function($http, $scope, $location, $rootScope, $q, $routeParams, requestUtil, properties, battleScribeSvc) {
    $scope.properties = properties;
    battleScribeSvc.getSelectionEntry();


    setData = function(data) {
        console.log(data.catalogue);
        for (var i in data.catalogue.sharedSelectionEntries.selectionEntry) {
            var selectionEntry = data.catalogue.sharedSelectionEntries.selectionEntry[i];
            if(!(selectionEntry.profiles.profile === undefined)) {
                console.log(selectionEntry._name + " <" + selectionEntry._type + ">" + " " + selectionEntry._id);
                console.log(selectionEntry.profiles.profile);
            }
        }
//		$scope.dataSet = data;
    };  
    
    requestUtil.get("../../resources/xml_db/8th/Adeptus_Ministorum_8th.cat", setData, battleScribeSvc.xmlTransform);
});