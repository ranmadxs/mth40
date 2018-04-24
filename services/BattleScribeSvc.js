app.service("battleScribeSvc", function(){   
    this.getSelectionEntry = function (){
        console.log("XDDDD");
        return  [];
    };
    this.xmlTransform = function(xml) {
		console.log("transform data");
                //console.log(xml.data);
		var x2js = new X2JS();
		var json = x2js.xml_str2json(xml.data);
                console.log(json);
		return json;
    };
});
