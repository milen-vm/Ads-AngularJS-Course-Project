'use strict';

app.factory('adsData', ['$http', '$q', 'httpData', 'userSession',
    function($http, $q, httpData, userSession) {
        var baseUrl = 'http://softuni-ads.azurewebsites.net/api/',
            userUrl = baseUrl + 'user/ads/',
            adminUrl = baseUrl + 'admin/';
        
        function getAuthorizationHeaders() {
            var accessToken = userSession.getAccessToken();
            
            return { 'Authorization': 'Bearer ' + accessToken };
        }
        
        function getMainUrl(isAdmin) {
            if (isAdmin) {
                return adminUrl;
            };
            
            return userUrl;
        }
        
        function getAllAds(categoryId, townId, pageSize, startPage) {
            var url = baseUrl + 'ads?categoryid=' + categoryId + '&townid=' + townId +
                    '&startpage=' + startPage + '&pagesize=' + pageSize;
                    
            return httpData.request(url, 'GET', null, null);
        }
        
        function getUserAds(pageSize, startPage, status) {
            var url = userUrl + '?pagesize=' + pageSize + '&startpage=' + startPage + '&status=' + status,
                headers = getAuthorizationHeaders();               
            
            return httpData.request(url, 'GET', null, headers);
        }
        
        function getAdminAds(categoryId, townId, pageSize, startPage) {
            var url = adminUrl + 'ads?categoryid=' + categoryId + '&townid=' + townId +
                    '&startpage=' + startPage + '&pagesize=' + pageSize,
                headers = getAuthorizationHeaders();
                
                return httpData.request(url, 'GET', null, headers);
        }
        
        function createNewAd(data) {
            var url = userUrl,
                headers = getAuthorizationHeaders();
            
            return httpData.request(url, 'POST', data, headers);
        }
      
        function deactiveAd(id) {
            var url = userUrl + 'deactivate/' + id,
                headers = getAuthorizationHeaders();
                
            return httpData.request(url, 'PUT', null, headers);
        }
        
        function deleteAd(id) {
            var url = userUrl + id,
                headers = getAuthorizationHeaders();
                
            return httpData.request(url, 'DELETE', null, headers);
        }
        
        function getAdById(id) {
            var url = userUrl + id,
                headers = getAuthorizationHeaders();
                
            return httpData.request(url, 'GET', null, headers);
        }
        
        function editAd(id, data) {
            var url = userUrl + id,
                headers = getAuthorizationHeaders();
                
            return httpData.request(url, 'PUT', data, headers);
        }
        
        function publishAgainAd(id, accessToken) {
            var url = userUrl + 'publishagain/' + id,
                headers = getAuthorizationHeaders();
                
            return httpData.request(url, 'PUT', null, headers);
        }
        
        return {
            getAds: getAllAds,           
            getUserAds: getUserAds,
            getAdminAds: getAdminAds,
            createNewAd: createNewAd,
            deactiveAd: deactiveAd,
            deleteAd: deleteAd,
            getAdById: getAdById,
            editAd: editAd,
            publishAgainAd: publishAgainAd
        };
    }
]);
