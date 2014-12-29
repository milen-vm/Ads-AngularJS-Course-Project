'use strict';

app.factory('httpRequest', function($http, $q) {
    var baseUrl = 'http://softuni-ads.azurewebsites.net/api/';       // http://localhost:1337

    function httpRequest(url, method) {
        var defer = $q.defer();
        
        $http({
            method: method,
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
    
    var getAllAds = function(pageSize, startPage) {
        var url = baseUrl + 'ads?pagesize=' + pageSize + '&startpage=' + startPage;
                
        return httpRequest(url, 'GET');
    };
    
    var getFilterData = function(type) {
        var url = baseUrl + type;
        
        return httpRequest(url, 'GET');
    };
    
    return {
        getAds: getAllAds,
        getFilterData: getFilterData
    };
});
