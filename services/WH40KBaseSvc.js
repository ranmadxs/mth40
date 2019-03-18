app.service("wh40KBaseSvc", function(properties){  
    console.log("init", "wh40KBaseSvc");
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
