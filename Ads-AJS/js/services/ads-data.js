'use strict';

app.factory('adsData', function($http, $q) {
    var baseUrl = 'http://softuni-ads.azurewebsites.net/api/';       // http://localhost:1337

    function getAds(categoryId, townId, pageSize, startPage) {
        var defer = $q.defer(),
            url = baseUrl + 'Ads?CategoryId=' + categoryId + '&TownId=' + townId +
                '&StartPage=' + startPage + '&PageSize=' + pageSize;
        
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
        getAds: getAds
    };
});
