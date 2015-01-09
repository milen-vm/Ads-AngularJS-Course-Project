'use strict';

app.factory('categoriesData', ['$http', '$q', '$resource', 'constValue',
    function($http, $q, $resource, constValue) {
        var url = 'http://softuni-ads.azurewebsites.net/api/categories';
        
        function getAllCategoriesR() {
            var urlR = constValue.baseUrl + 'categories',
                result = [];

            $http({
                method: 'GET',
                url: urlR
            })
            .success(function(data, status, headers, config) {
                result = data;
            })
            .error(function(error, status, headers, config) {
                console.log(error);
            });
            
            return result;
        }
        
        function getAllCategories() {
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
            getCategories: getAllCategories,
            getAll: getAllCategoriesR
        };
    }
]);
