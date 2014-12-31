'use strict';

app.factory('categoriesData', [$http, $q, 
    function($http, $q) {
        var url = 'http://softuni-ads.azurewebsites.net/api/categories';
        
        function getAllCategories(url) {
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
            getCategories: getAllCategories
        };
    }
]);
