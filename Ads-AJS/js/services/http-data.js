'use strict';

app.factory('httpData', ['$http', '$q', 
    function($http, $q) {
        function request(url, method, data, headers) {
            var defer = $q.defer();
            
            $http({
                method: method,
                url: url,
                headers: headers,
                data: data
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
            request: request
        };
    }
]);
