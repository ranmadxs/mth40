app.service("rosterSvc", function (properties, wh40KFactory) {
    console.log("init", "rosterSvc");
    
    
    var loadRoster;
    this.init = function (rosterVO) {
        loadRoster = wh40KFactory.loadCodex(rosterVO.codex, rosterVO.file, 'roster');
        
        return new Promise(function (resolve, reject) {
            Promise.all([loadRoster]).then(values => {
                values.forEach(function (e) {
                    //listCodex[e.name] = e.catalogue;
                });
                resolve("OK");
                console.log("XD", "loadAllCodex");
            }, errHandler);
        });        
    }
});
