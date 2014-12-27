'use strict';

app.factory('adsData', function($http, $q) {
    function getAllAds() {
        var defer = $q.defer();
        
        $http({
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/ads'
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
