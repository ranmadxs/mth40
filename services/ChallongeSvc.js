app.service("challongeSvc", function (properties, $http) {
    console.log("init challonge user: " + properties.challonge.username);

    this.listTournaments = function ($status) {
        console.debug("init", "listTournaments");
        
        return new Promise(function (resolve, reject) {
            var httpData = {
                state: $status 
            };
/*
            $http({
                method: 'GET',
                url: 'https://api.challonge.com/v1/tournaments.json',
                headers: {
                    'Authorization': 'Basic ' + properties.challonge.username + ':' + properties.challonge.apikey
                            //or
                            //'Authorization': 'Basic ' + 'token'
                },
                data: httpData
            }).then(function successCallback(response) {
                console.log("OK")
            }, function errorCallback(response) {
                if (response.status = 401) { // If you have set 401
                    console.error("ohohoh")
                }
            });
*/

            resolve("OK");
        });
    };
});