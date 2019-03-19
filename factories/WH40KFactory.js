//TODO:promised
app.factory('wh40KFactory', function($location, $http, properties) {
    
    var codexMap = {}        
    
    return {
        getCodex: function($codexName) { 
            console.log("codex="+$codexName, "wh40KFactory::getCodex");
            console.log(codexMap);
            return codexMap[$codexName];
        },
        getData: function(url) {
            console.log("getData="+url, "wh40KFactory::getData");
            // Return new promise 
            return new Promise(function(resolve, reject) {
                // Do async job
                console.log("Promise="+url, "wh40KFactory::getData::Promise");
                resolve("XD" + url);                
                /*
                request.get(options, function(err, resp, body) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(body);
                    }
                });
                */
            });
        },        
        
        load: function(){
            console.log("init", "wh40KFactory::load");
            var load40KPromised = this.loadCodex("Orks", 'resources/xml_db/8th/eng/Orks.cat');
            
            load40KPromised.then(function(result) {
                            userDetails = result;
                            console.log(result);
                            // Do one more async operation here
                            //var anotherPromise = getData(userDetails.followers_url).then(JSON.parse);
                            //return anotherPromise;
                            codexMap["Orks"] = result;
                        }, errHandler);             
        },
        loadCodex: function($codexName, $codexUrl){
            console.log("init "+$codexName, "wh40KFactory::loadCodex");
            return new Promise(function(resolve, reject) {
                console.log("promised "+$codexName, "wh40KFactory::loadCodex");
                var request = new XMLHttpRequest();
                
                request.onreadystatechange = function() { 
                    if (this.readyState == 4 && this.status == 200) {            
                        var xmlDocument = jQuery.parseXML(this.responseText);            
                        var gameSystemDoc = jQuery(xmlDocument);
                        var strFind = "selectionEntry[type='unit']";
                        var sharedSelectionEntries = jQuery(gameSystemDoc).find("catalogue sharedSelectionEntries");
                        var codexAux = jQuery(sharedSelectionEntries).find(strFind);
                        console.log("promised3", "wh40KFactory::loadCodex");
                        resolve(codexAux);
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