'use strict';

app.factory('adminAds', ['httpData', 'userSession', 'constValue',
    function(httpData, userSession, constValue) {
        var adminUrl = constValue.baseUrl + 'admin/';
        
        function getAuthorizationHeaders() {
            var accessToken = userSession.getAccessToken();
            
            return { 'Authorization': 'Bearer ' + accessToken };
        }


        
        function getAdminAds(categoryId, townId, pageSize, startPage) {
            // Ads?Status={Status}&CategoryId={CategoryId}&TownId={TownId}&SortBy={SortBy}&
                // StartPage={StartPage}&PageSize={PageSize}
            var url = adminUrl + 'ads?categoryid=' + categoryId + '&townid=' + townId +
                    '&startpage=' + startPage + '&pagesize=' + pageSize,
                headers = getAuthorizationHeaders();
                
                return httpData.request(url, 'GET', null, headers);
        }
        
        return {
            getAdminAds: getAdminAds,
        };
    }
]);
