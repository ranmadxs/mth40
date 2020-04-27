app.service("wh40KBaseSvc", function (properties, wh40KFactory) {
    console.log("init", "wh40KBaseSvc");
    var loadOrks = wh40KFactory.loadCodex("Orks", 'resources/xml_db/8th/eng/Orks.cat', "catalogue");
    var loadMechanicus = wh40KFactory.loadCodex("Mechanicus", 'resources/xml_db/8th/eng/Imperium_-_Adeptus_Mechanicus.cat', "catalogue");
    var loadWH40K = wh40KFactory.loadCodex("WH40K", 'resources/xml_db/8th/eng/Warhammer_40,000_8th_Edition.cat', "gameSystem");

    var listCodex = {};

    this.loadAllCodex = function () {
        return new Promise(function (resolve, reject) {
            Promise.all([loadWH40K, loadOrks, loadMechanicus]).then(values => {
                values.forEach(function (e) {
                    listCodex[e.name] = e.catalogue;
                });
                resolve("OK");
                console.log(listCodex, "loadAllCodex");
            }, errHandler);
        });

        return  [];
    };

    this.findUnit = function ($codex, $unit) {
        var codex = listCodex[$codex];
        var sharedProfilesDoc = jQuery(codex).find("catalogue sharedSelectionEntries");
        var strFind = "selectionEntry[type='unit']selectionEntry[name*='" + $unit + "']";
        //var strFind = "selectionEntry[type='unit']";
        var units = [];
        var selectionEntryList = jQuery(sharedProfilesDoc).find(strFind).each(function (x) {
            console.log(x);
            console.log(this);
            var charStr = "selectionEntryGroups selectionEntryGroup[name='Mob'] selectionEntries selectionEntry[type='model'] profiles profile[profileTypeName='Unit'] characteristics";
            var characteristicsObj = jQuery(this).find(charStr);
            var charM = jQuery(characteristicsObj).find("characteristics characteristic[name='M']").attr("value");
            var charJson = {}
            properties.characteristics.forEach(function (char) {
                charJson[char.name] = jQuery(characteristicsObj).find("characteristics characteristic[name='"+char.name+"']").attr("value");
            });
            /*
            var charJson = {
                "M": jQuery(characteristicsObj).find("characteristics characteristic[name='M']").attr("value"),
                "WS": jQuery(characteristicsObj).find("characteristics characteristic[name='WS']").attr("value"),
                "BS": jQuery(characteristicsObj).find("characteristics characteristic[name='BS']").attr("value"),
                "S": jQuery(characteristicsObj).find("characteristics characteristic[name='S']").attr("value"),
                "T": jQuery(characteristicsObj).find("characteristics characteristic[name='T']").attr("value"),
                "W": jQuery(characteristicsObj).find("characteristics characteristic[name='W']").attr("value"),
                "A": jQuery(characteristicsObj).find("characteristics characteristic[name='A']").attr("value"),
                "Ld": jQuery(characteristicsObj).find("characteristics characteristic[name='Ld']").attr("value"),
                "Save": jQuery(characteristicsObj).find("characteristics characteristic[name='Save']").attr("value"),
            };
            */
            if(jQuery(characteristicsObj).children().length > 0){
                console.log("TIENEEEEEEEE");
            }else{
                console.log("NOOOOOOOOOOO");
                charStr = "selectionEntry profiles profile[profileTypeName='Unit'] characteristics";
                characteristicsObj = jQuery(this).find(charStr);
                console.log(characteristicsObj);
                properties.characteristics.forEach(function (char) {
                    charJson[char.name] = jQuery(characteristicsObj).find("characteristics characteristic[name='"+char.name+"']").attr("value");
                });                
            }
            console.log(charM);
            jQuery(this).find("selectionEntryGroups selectionEntryGroup[name='Mob'] selectionEntries selectionEntry[type='model']").each(function (y) {
                console.log(y);
                console.log(this);
            });
            var unit = {
                'name': jQuery(this).attr("name"),
                'characteristics': charJson
            };
            console.log(unit);
            units.push(unit);
        });
        return units;
    };

    var parser = new DOMParser();
    var x = new XMLHttpRequest();
    //x.open("GET", "http://localhost/simulation-web/mth40/resources/xml_db/8th/eng/Orks.cat", true);

    var request = new XMLHttpRequest();
    /*
     request.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {            
     //var parser = new DOMParser();
     //var doc = parser.parseFromString(this.responseText, "text/xml");            
     //var selectionEntryList = doc.getElementsByTagName("selectionEntry");
     //console.log(selectionEntryList);
     var xmlDocument = jQuery.parseXML(this.responseText);            
     //var selectionEntryList = jQuery(xmlDocument).find("selectionEntry[id='2b03-8d64-3711-f300']");
     var strFind = "selectionEntry[id='2b03-8d64-3711-f300']";
     //strFind = "gameSystem sharedProfiles profile[profileTypeName='Weapon']";
     strFind = "gameSystem sharedProfiles profile[profileTypeName='Weapon']";
     strFind = "profile[profileTypeName='Weapon']";
     //strFind = "profile[id='e353-0508-4f8f-d305'], profile[id='74b1-313a-9041-dfd5']";
     strFind = "profile[name='Assault bolter']";
     //strFind = "profile[name*='bolter']";
     var gameSystemDoc = jQuery(xmlDocument);
     //console.log(gameSystemDoc);
     var sharedProfilesDoc = jQuery(gameSystemDoc).find("gameSystem sharedProfiles");
     //console.log(sharedProfilesDoc);
     var selectionEntryList = jQuery(sharedProfilesDoc).find(strFind).each(function(x){
     console.log(x);
     console.log(this);
     });  
     //console.log(selectionEntryList);
     }
     };
     
     request.open('GET', 'resources/xml_db/8th/eng/Warhammer_40,000_8th_Edition.cat');
     request.send();
     
     
     request = new XMLHttpRequest();
     
     
     request.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {            
     //var parser = new DOMParser();
     //var doc = parser.parseFromString(this.responseText, "text/xml");            
     //var selectionEntryList = doc.getElementsByTagName("selectionEntry");
     //console.log(this.responseText);
     var xmlDocument = jQuery.parseXML(this.responseText);            
     //var selectionEntryList = jQuery(xmlDocument).find("selectionEntry[id='2b03-8d64-3711-f300']");
     var strFind = "profile[profileTypeName='Unit']";
     //console.log(xmlDocument);
     var gameSystemDoc = jQuery(xmlDocument);
     // console.log(gameSystemDoc);
     var sharedProfilesDoc = jQuery(gameSystemDoc).find("catalogue sharedProfiles");
     jQuery(sharedProfilesDoc).find(strFind).each(function(x){
     console.log(x);
     console.log(this);
     });  
     
     strFind = "selectionEntry[type='unit']";
     sharedProfilesDoc = jQuery(gameSystemDoc).find("catalogue sharedSelectionEntries");
     jQuery(sharedProfilesDoc).find(strFind).each(function(x){
     console.log(x);
     console.log(this);
     });              
     
     //console.log(selectionEntryList);
     }
     };
     
     request.open('GET', 'resources/xml_db/8th/eng/Orks.cat');
     request.send();
     */
});
