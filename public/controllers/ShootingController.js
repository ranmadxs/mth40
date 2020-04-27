/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//TODO: Revisar como poner los tanques y las escuadras.
//<entryLinks>
//<sharedSelectionEntries> -> 
app.controller('ShootingController', function($http, $scope, $filter, $location, $rootScope, $q, $routeParams, requestUtil, properties, battleScribeSvc, comparaSvc) {
    $scope.properties = properties;
    $scope.listSelectionEntry = [];
    $scope.selected = undefined;
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    var arraySelectionEntry = [];
    $scope.arraySelectionEntry = arraySelectionEntry;
    
    $scope.listCharSelected = [];
    $scope.selectedEntry = {
        _name: 'Seleccione Personaje ...',
        _id : null
    };    

    $scope.characteristics = properties.characteristics;

    $scope.comparar = function(){
        console.log("Init comparar", "comparar");
        var resCompara = comparaSvc.compara($scope.listCharSelected);
        console.log(resCompara);

    };

    $scope.showSelected = function(data, charObj) {
      //console.log(data.selected, "afterSaveForm");
//      console.log(charObj);
//      if ($scope.listCharSelected[charObj.id] == undefined){
//          console.log("XDDD", "WGTF");
//      }else{
//          console.log($scope.listCharSelected[charObj.id], ":SSS")
//      }
          $scope.listCharSelected[charObj.id] = {
            _name: data.selected._name,
            _id : data.selected._id,
            _valuesChars : []
          };
          //console.log($scope.listCharSelected, ":SSS")
      
      $scope.selectedEntry._id = data.selected._id;
    };
    
      $scope.afterSaveForm = function(){
         // console.log($scope.selectedEntry, "afterSaveForm");
      };
    
      $scope.beforeSaveForm = function(charObj){
            var charObjId = charObj.id;
            console.log(charObj, "beforeSaveForm id="+charObjId);
            
            console.log($scope.listCharSelected[charObj.id], ">> beforeSaveForm");
            
            //$scope.characteristics[charObjId] = properties.characteristics;
            var entryFull = $scope.arraySelectionEntry[$scope.selectedEntry._id];
            console.log(entryFull, "beforeSaveForm");
            var listChar = battleScribeSvc.getCharacteristics(entryFull);
            console.log(listChar, "listChar");
            $scope.listCharSelected[charObj.id]._characteristics = listChar;
            for (var index in $scope.characteristics) {
                var valurChr = listChar[$scope.characteristics[index]._xmlName];
                $scope.listCharSelected[charObj.id]._valuesChars.push(valurChr);
                //$scope.characteristics[charObjId][index]._value = valurChr;
            }
            if(!$rootScope.$$phase) {
                $rootScope.$digest();
            }
      }
    
    battleScribeSvc.getSelectionEntry();
    

    setData = function(data) {
        //console.log(data.catalogue);  
        var listSelectionEntry = $scope.listSelectionEntry;
        for (var i in data.catalogue.sharedSelectionEntries.selectionEntry) {
            var selectionEntryAux = data.catalogue.sharedSelectionEntries.selectionEntry[i];
            //console.log(selectionEntryAux, "XDD")
            var totProfiles = 0;
            if(!(selectionEntryAux.profiles.profile === undefined)){
                totProfiles = selectionEntryAux.profiles.profile.length;
            }else{
               totProfiles = 0;
            }
            //console.log(totProfiles, "totProfiles");
            if(totProfiles> 0) {
                //console.log(selectionEntry._name + " <" + selectionEntry._type + ">" + " " + selectionEntry._id);
                //console.log(selectionEntryAux.profiles);
                var selectionEntry = {
                    _name: selectionEntryAux._name,
                    _id : selectionEntryAux._id,
                    catalogue : {
                        _name : data.catalogue._name,
                        _id : data.catalogue._id,
                    }                    
                  };                

                listSelectionEntry.push(selectionEntry);
                $scope.arraySelectionEntry[selectionEntryAux._id] = selectionEntryAux;
                //console.log(selectionEntry);
            }            
        }
        $scope.listSelectionEntry = listSelectionEntry;
    };  
    for (var index in properties.wh_40_databases) {
        requestUtil.get(properties.wh_40_databases[index]._path, setData, battleScribeSvc.xmlTransform);
    }
    //requestUtil.get("../../../resources/xml_db/8th/Adeptus_Ministorum_8th.cat", setData, battleScribeSvc.xmlTransform);
    //requestUtil.get("../../../resources/xml_db/8th/Marines_Espaciales_8th.cat", setData, battleScribeSvc.xmlTransform);
});