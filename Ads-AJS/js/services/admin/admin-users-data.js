'use strict';

app.factory('adminUsers', ['httpData', 'userSession', 'constValue',
    function(httpData, userSession, constValue) {
        var adminUrl = constValue.baseUrl + 'admin/';
        
        function getAuthorizationHeaders() {
            var accessToken = userSession.getAccessToken();
            
            return { 'Authorization': 'Bearer ' + accessToken };
        }
        
        function getAllUsers(sortBy, startPage, pageSize) {
            var url = adminUrl + 'Users?SortBy=' + sortBy + '&StartPage=' + startPage + '&PageSize=' + pageSize,
               headers = getAuthorizationHeaders();
               
               return httpData.request(url, 'GET', null, headers); 
        }
        
        return {
            getAll: getAllUsers
        };
    }
]);
