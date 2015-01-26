'use strict';

app.factory('adminTownsData', ['httpData', 'userSession', 'constValue',
    function(httpData, userSession, constValue) {
        var townsUrl = constValue.baseUrl + 'admin/towns';
        
        function getAuthorizationHeaders() {
            var accessToken = userSession.getAccessToken();
            
            return { 'Authorization': 'Bearer ' + accessToken };
        }
        
        function getAlltowns(sortBy, currentPage, pageSize) {
            var url = townsUrl + '?sortBy=' + sortBy + '&StartPage=' + currentPage + '&PageSize=' + pageSize,
                headers = getAuthorizationHeaders();
                
            return httpData.request(url, 'GET', null, headers);
        }
        
        function createTown(data) {
            var url = townsUrl,
                headers = getAuthorizationHeaders();
                
            return httpData.request(url, 'POST', data, headers);
        }
        
        function editTown(data, id) {
            var url = townsUrl + '/' + id,
                headers = getAuthorizationHeaders();
                
            return httpData.request(url, 'PUT', data, headers);
        }
        
        function deleteTown(id) {
            var url = townsUrl + '/' + id,
                headers = getAuthorizationHeaders();
                
            return httpData.request(url, 'DELETE', null, headers);
        }
        
        return {
            getAll: getAlltowns,
            create: createTown,
            edit: editTown,
            delete: deleteTown
        };
    }
]);
