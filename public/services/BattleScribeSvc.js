app.service("battleScribeSvc", function(properties){  
    
   
    this.getSelectionEntry = function (){
        console.log("XDDDD");
        console.log(properties);
        return  [];
    };
    this.xmlTransform = function(xml) {
	//console.log("transform data");
        var x2js = new X2JS();
        var json = x2js.xml_str2json(xml.data);
        //console.log(json);
	return json;
    };
    this.getProfileType = function(profileType, entry) {
        //console.log(entry.profiles.profile, "getProfileType");
        
        var profile;
        for (var index in entry.profiles.profile) {
            
            //console.log(profile._profileTypeName + "===" + profileType, "getProfileType");
            //console.log(profile);
            if(entry.profiles.profile[index]._profileTypeName === profileType){
                profile = entry.profiles.profile[index];
                console.log(profile, "getProfileType");
                break;
            }
            
        }
        
        if(profile === undefined){
            console.log("undefined", "veamos profile");   
            profile = entry.profiles.profile;
        }
        console.log(profile, "veamos profile");
        return profile;
    }
   
    this.getCharacteristics = function(entry) { 
        console.log(entry);
        var profile = this.getProfileType(properties.filtros_xml.character_profile_name, entry);
        var characteristics = [];
        for (var index in profile.characteristics.characteristic) {
            characteristics[profile.characteristics.characteristic[index]._name] = profile.characteristics.characteristic[index]._value;
        }
        console.log(characteristics);
        return characteristics;
    }
    
});
