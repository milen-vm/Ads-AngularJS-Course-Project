'use strict';

app.factory('adsData', function($http, $q) {
    var baseUrl = 'http://softuni-ads.azurewebsites.net/api';       // http://localhost:1337
    
    function getAllAds(pageSize, startPage) {
        var defer = $q.defer();
        
        $http({
            method: 'GET',
            url: baseUrl + '/ads?pagesize=' + pageSize + '&startpage=' + startPage,
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
        getAds: getAllAds
    };
});
