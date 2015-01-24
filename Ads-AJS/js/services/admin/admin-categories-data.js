'use strict';

app.factory('adminCategories', ['httpData', 'userSession', 'constValue',
    function(httpData, userSession, constValue) {
        var categoriesUrl = constValue.baseUrl + 'admin/Categories';
        
        function getAuthorizationHeaders() {
            var accessToken = userSession.getAccessToken();
            
            return { 'Authorization': 'Bearer ' + accessToken };
        }
        
        

        function getAllCategiries(sortBy, currentPage, pageSize) {
            var url = categoriesUrl + '?SortBy=' + sortBy + '&StartPage=' + currentPage + '&PageSize=' + pageSize,
                headers = getAuthorizationHeaders();
                
            return httpData.request(url, 'GET', null, headers);
        }
        
        function deleteCategorie(id) {
            var url = categoriesUrl + '/' + id,
                headers = getAuthorizationHeaders();
                
            return httpData.request(url, 'DELETE', null, headers);
        }
        
        function createCategory(data) {
            var url = categoriesUrl,
                headers = getAuthorizationHeaders();
                
            return httpData.request(url, 'POST', data, headers);
        }
        
        return {
            getAll: getAllCategiries,
            delete: deleteCategorie,
            create: createCategory
        };
    }
]);
