app.service("comparaSvc", function(properties){  
    
    this.compara = function (listCharSelected){
        var listCompara = [];
        for (var idx in listCharSelected){
            console.log(listCharSelected[idx], "compara"); 
            var comparaEntry = {_id: listCharSelected[idx]._id,
                _name : listCharSelected[idx]._name
            };
            listCompara[idx] = comparaEntry;
        }
        
       
        return  listCompara;
    };
    
    this.cmpCharacteristics = function(listCompara, listCharSelected){
        for (var index in properties.characteristics) {
        }
        var comparaResult = {
            
        };
        return listCompara;
    };
});