//TODO:promised
app.factory('wh40KFactory', function($location, $http, properties) {
    
    var codexMap = {}
    
    
    
    return {
        getCodex: function($codexName) { 
            console.log("codex="+$codexName, "wh40KFactory::getCodex");
            console.log(codexMap);
            return codexMap[$codexName];
        },
        load: function(){
            console.log("init", "wh40KFactory::load");
            this.loadCodex("Orks", 'resources/xml_db/8th/eng/Orks.cat');
        },
        loadCodex: function($codexName, $codexUrl){
            console.log("init "+$codexName, "wh40KFactory::loadCodex");
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {            
                    var xmlDocument = jQuery.parseXML(this.responseText);            
                    var gameSystemDoc = jQuery(xmlDocument);
                    var strFind = "selectionEntry[type='unit']";
                    var sharedSelectionEntries = jQuery(gameSystemDoc).find("catalogue sharedSelectionEntries");
                    codexMap[$codexName] = jQuery(sharedSelectionEntries).find(strFind);
//                    jQuery(sharedSelectionEntries).find(strFind).each(function(x){
//                        console.log(x);
//                        console.log(this);
//                    });
                }                
            };   
            request.open('GET', $codexUrl);
            request.send();                        
        }       
    };
    
});