'use strict';

app.factory('townsData', 
    function($http, $q) {
        var url = 'http://softuni-ads.azurewebsites.net/api/towns';
        
        function getAllTowns() {
            var defer = $q.defer();
            
            $http({
                method: 'GET',
                url: url
            })
            .success(function(data, status, headers, config) {
                defer.resolve(data);
            })
            .error(function(error, status, headers, config) {
                defer.reject(error);
            });
            
            return defer.promise;
        }
    
        return {
            getTowns: getAllTowns
        };
    }
);