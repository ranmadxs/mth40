var app = angular.module('WH40KApp', ['ngWebSocket', 'ngRoute', 'xeditable', 'ui.select', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

app.constant('properties', wh40KProperties);

app.factory('requestUtil', function ($location, $http) {

    return {
        getEnv: async () => {
            var environment = null;
            await $http({
                method: 'GET',
                url: 'environment-vars.php'     
            }).then(function successCallback(response) {
                //console.log(response.data);
                environment = JSON.parse(response.data);          
            }, function errorCallback(response) {
                if (response.status = 401) { // If you have set 401
                    console.error("ohohoh");
                }
            });   
            console.log(environment, "[INFO]");
            return(environment);
        },

        getParam: function ($paramName) {
            console.log($paramName)
            console.log($location);
            console.log($location.$$hash);
            var search = $location.$$hash;
            search = search.replace("?", "");
            var obj = search.split("&").reduce(function (prev, curr, i, arr) {
                var p = curr.split("=");
                prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
                return prev;
            }, {});
            console.log(obj);
            console.log(obj[$paramName]);
            return obj[$paramName];
        },

        get: function (file, callback, transform) {
            $http.get(file)
                    .then(function (response) {
                        console.log(response);
                        var retTrans = transform(response);
                        callback(retTrans);
                    }, function (error) {
                        console.error(error); //
                    });
        }
    };
});

var errHandler = function (err) {
    console.log(err);
}

app.run(async (editableOptions, wh40KFactory, $http, $rootScope) => {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        console.log("INIT_LOAD_ENV", "appRun");

        //var load40KPromised = wh40KFactory.load();
        //var orksCodex = wh40KFactory.getCodex("Orks");
        //console.log(orksCodex);
        //var dataPromise = wh40KFactory.getData("Orks");
        /*
         * orksCodex.each(function(e){
         console.log(this);
         });
         */
    });