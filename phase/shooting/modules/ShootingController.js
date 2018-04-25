/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//<entryLinks>
//<sharedSelectionEntries> -> 
app.controller('ShootingController', function($http, $scope, $filter, $location, $rootScope, $q, $routeParams, requestUtil, properties, battleScribeSvc) {
    $scope.properties = properties;
    $scope.listSelectionEntry = [];
    
    $scope.selected = undefined;
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    var arraySelectedEntry = [];
    
    
   $scope.selectedEntry = {
    _name: 'Seleccione Personaje ...',
    _id : null
  };

  $scope.characteristics = properties.characteristics;

  $scope.showSelected = function(data) {
    //console.log(data);
  };
    
      $scope.afterSaveForm = function(){
          console.log($scope.selectedEntry, "afterSaveForm");
      }
    
      $scope.beforeSaveForm = function(){
            console.log($scope.selectedEntry, "beforeSaveForm");
            var entryFull = arraySelectedEntry[$scope.selectedEntry._id];
            console.log(entryFull);
            var listChar = battleScribeSvc.getCharacteristics(entryFull);
            for (var index in $scope.characteristics) {
                var valurChr = listChar[$scope.characteristics[index]._xmlName];
                $scope.characteristics[index]._value = valurChr;
            }
      }
    
    battleScribeSvc.getSelectionEntry();
    

    setData = function(data) {
        //console.log(data.catalogue);  
        var listSelectionEntry = $scope.listSelectionEntry;
        for (var i in data.catalogue.sharedSelectionEntries.selectionEntry) {
            var selectionEntryAux = data.catalogue.sharedSelectionEntries.selectionEntry[i];
            if(!(selectionEntryAux.profiles.profile === undefined)) {
                //console.log(selectionEntry._name + " <" + selectionEntry._type + ">" + " " + selectionEntry._id);
                //console.log(selectionEntry.profiles.profile);
                var selectionEntry = {
                    _name: selectionEntryAux._name,
                    _id : selectionEntryAux._id,
                    catalogue : {
                        _name : data.catalogue._name,
                        _id : data.catalogue._id,
                    }                    
                  };                

                listSelectionEntry.push(selectionEntry);
                arraySelectedEntry[selectionEntryAux._id] = selectionEntryAux;
                //console.log(selectionEntry);
            }            
        }
        $scope.listSelectionEntry = listSelectionEntry;
    };  
    
    requestUtil.get("../../resources/xml_db/8th/Adeptus_Ministorum_8th.cat", setData, battleScribeSvc.xmlTransform);
    requestUtil.get("../../resources/xml_db/8th/Marines_Espaciales_8th.cat", setData, battleScribeSvc.xmlTransform);
});