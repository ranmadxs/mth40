//TODO:promised
app.factory('wh40KFactory', function ($location, $http, properties) {

    parseXmlObj = function ($fileContent, $mainTag) {
        var xmlDocument = jQuery.parseXML($fileContent);
        var gameSystemDoc = jQuery(xmlDocument);
        var catalogue = jQuery(gameSystemDoc).find($mainTag);
        console.log("readyPArse", "wh40KFactory::parseXmlObj");
        var codex = {"catalogue": catalogue};
        return codex;
    };

    return {
        loadCodexFromUrl: function ($codexUrl, $mainTag) {
            console.log("init " + $codexUrl, "wh40KFactory::loadCodexFromUrl");
            return new Promise(function (resolve, reject) {
                console.log("promised " + $codexUrl, "wh40KFactory::loadCodex");
                var request = new XMLHttpRequest();

                request.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        resolve(parseXmlObj(this.responseText, $mainTag));
                    }
                };
                request.open('GET', $codexUrl);
                request.send();

            });
        },
        loadCodexFromFile: function ($codexFile, $mainTag) {
            console.log("init ", "wh40KFactory::loadCodexFromFile");
            return new Promise(function (resolve, reject) {
                resolve(parseXmlObj($codexFile, $mainTag));
            });
        }
    };
});