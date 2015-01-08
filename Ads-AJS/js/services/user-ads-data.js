'use strict';

app.factory('userAds', ['httpData', 'userSession', 'constValue',
    function(httpData, userSession, constValue) {
        var userUrl = constValue.baseUrl + 'user/ads/';
        
        function getAuthorizationHeaders() {
            var accessToken = userSession.getAccessToken();
            
            return { 'Authorization': 'Bearer ' + accessToken };
        }
        
        function getAllAds(categoryId, townId, pageSize, startPage) {
            var url = constValue.baseUrl + 'ads?categoryid=' + categoryId + '&townid=' + townId +
                    '&startpage=' + startPage + '&pagesize=' + pageSize;
                    
            return httpData.request(url, 'GET', null, null);
        }
        
        function getUserAds(pageSize, startPage, status) {
            var url = userUrl + '?pagesize=' + pageSize + '&startpage=' + startPage + '&status=' + status,
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
            createNewAd: createNewAd,
            deactiveAd: deactiveAd,
            deleteAd: deleteAd,
            getAdById: getAdById,
            editAd: editAd,
            publishAgainAd: publishAgainAd
        };
    }
]);
