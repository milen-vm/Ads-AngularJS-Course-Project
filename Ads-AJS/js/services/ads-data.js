'use strict';

app.factory('adsData', function($http, $q) {
    var baseUrl = 'http://softuni-ads.azurewebsites.net/api/';       // http://localhost:1337

    function adsDataRequest(url, method, data, headers) {
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
    
    function getAds(categoryId, townId, pageSize, startPage) {
        var url = baseUrl + 'Ads?CategoryId=' + categoryId + '&TownId=' + townId +
                '&StartPage=' + startPage + '&PageSize=' + pageSize;
                
        return adsDataRequest(url, 'GET', null, null);
    }
    
    function createNewAd(data, accessToken) {
        var url = baseUrl + 'user/ads',
            headers = { 'Authorization': 'Bearer ' + accessToken };
        
        return adsDataRequest(url, 'POST', data, headers);
    }

    function getUserAds(pageSize, startPage, accessToken, status) {
        var url = baseUrl + 'user/ads?pagesize=' + pageSize + '&startpage=' + startPage +
                '&status=' + status,
            headers = { 'Authorization': 'Bearer ' + accessToken };
        
        return adsDataRequest(url, 'GET', null, headers);
    }
    
    function deactiveAd(id, accessToken) {
        var url = baseUrl + 'user/ads/deactivate/' + id,
            headers = { 'Authorization': 'Bearer ' + accessToken };
            
        return adsDataRequest(url, 'PUT', null, headers);
    }
    
    function deleteAd(id, accessToken) {
        var url = baseUrl + 'user/ads/' + id,
            headers = { 'Authorization': 'Bearer ' + accessToken };
            
        return adsDataRequest(url, 'DELETE', null, headers);
    }
    
    function getAdById(id, accessToken) {
        var url = baseUrl + 'user/ads/' + id,
            headers = { 'Authorization': 'Bearer ' + accessToken };
            
        return adsDataRequest(url, 'GET', null, headers);
    }
    
    function editAd(id, data, accessToken) {
        var url = baseUrl + 'user/ads/' + id,
            headers = { 'Authorization': 'Bearer ' + accessToken };
            
        return adsDataRequest(url, 'PUT', data, headers);
    }
    
    return {
        getAds: getAds,
        createNewAd: createNewAd,
        getUserAds: getUserAds,
        deactiveAd: deactiveAd,
        deleteAd: deleteAd,
        getAdById: getAdById,
        editAd: editAd
    };
});
