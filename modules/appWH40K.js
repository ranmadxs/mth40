var app = angular.module('WH40KApp', ['ngWebSocket', 'ngRoute']);

app.constant('properties', wh40KProperties);

app.factory('requestUtil', function($location, $http) {

    return {
        getParam: function($paramName) {            
            console.log($paramName)
            console.log($location);
            console.log($location.$$hash);
            var search = $location.$$hash;
            search = search.replace("?", "");
            var obj = search.split("&").reduce(function(prev, curr, i, arr) {
                var p = curr.split("=");
                prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
                return prev;
            }, {});       
            console.log(obj);
            console.log(obj[$paramName]);
            return obj[$paramName];
        },
        
        
        
        get: function(file,callback,transform){
            $http.get(file)
                .then(function(response){
                    console.log(response);
                    var retTrans = transform(response);
                    callback(retTrans);
                }, function(error){
                    console.error(error); //
            });			
        }
    };
});