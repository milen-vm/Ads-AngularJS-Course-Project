'use strict';

app.factory('adminAds', ['httpData', 'userSession', 'constValue',
    function(httpData, userSession, constValue) {
        var adminUrl = constValue.baseUrl + 'admin/';
        
        function getAuthorizationHeaders() {
            var accessToken = userSession.getAccessToken();
            // console.log(accessToken);
            return { 'Authorization': 'Bearer ' + accessToken };
        }


        
        function getAdminAds(status, categoryId, townId, pageSize, startPage) {
            var url = adminUrl + 'ads?status=' + status + '&categoryid=' + categoryId + '&townid=' + townId +
                       '&sortby=-Date' + '&startpage=' + startPage + '&pagesize=' + pageSize,
                headers = getAuthorizationHeaders();
                
                return httpData.request(url, 'GET', null, headers);
        }
        
        function getAdById(id) {
            var url = adminUrl + 'ads/' + id,
                headers = getAuthorizationHeaders();
                
            return httpData.request(url, 'GET', null, headers);
        }
        
        function editAd(data, id) {
            var url = adminUrl + 'ads/' + id,
                headers = getAuthorizationHeaders();
            
            return httpData.request(url, 'PUT', data, headers);
        }
        
        function rejectAd(id) {
            var url = adminUrl + 'ads/reject/' + id,
                headers = getAuthorizationHeaders();
                
            return httpData.request(url, 'PUT', null, headers);
        }
        
        return {
            getAdminAds: getAdminAds,
            getAdById: getAdById,
            editAd: editAd,
            rejectAd: rejectAd
        };
    }
]);
