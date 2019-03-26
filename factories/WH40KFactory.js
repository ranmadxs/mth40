//TODO:promised
app.factory('wh40KFactory', function($location, $http, properties) {
    
    return {
        loadCodex: function($codexName, $codexUrl, $mainTag){
            console.log("init "+$codexName, "wh40KFactory::loadCodex");
            return new Promise(function(resolve, reject) {
                console.log("promised "+$codexUrl, "wh40KFactory::loadCodex");
                var request = new XMLHttpRequest();
                
                request.onreadystatechange = function() { 
                    if (this.readyState == 4 && this.status == 200) {            
                        var xmlDocument = jQuery.parseXML(this.responseText);            
                        var gameSystemDoc = jQuery(xmlDocument);
                        var catalogue = jQuery(gameSystemDoc).find($mainTag);
                        //var strFind = "selectionEntry[type='unit']";
                        //var sharedSelectionEntries = jQuery(gameSystemDoc).find("catalogue sharedSelectionEntries");
                        //var codexAux = jQuery(sharedSelectionEntries).find(strFind);
                        console.log("promised3", "wh40KFactory::loadCodex");
                        var codex = {"name" : $codexName, "catalogue" : catalogue};
                        resolve(codex);
    //                    jQuery(sharedSelectionEntries).find(strFind).each(function(x){
    //                        console.log(x);
    //                        console.log(this);
    //                    });
                    }                
                };   
                request.open('GET', $codexUrl);
                request.send();   
                               
            });
        }       
    };    
});