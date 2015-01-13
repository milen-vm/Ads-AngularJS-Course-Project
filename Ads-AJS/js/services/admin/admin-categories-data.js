'use strict';

app.factory('adminCategories', ['$resource', '$http', 'userSession', 'constValue',
    function($resource, $http, userSession, constValue) {
        $http.defaults.headers.common = userSession.getAuthorization();
        var url = constValue.baseUrl + 'admin/Categories?SortBy=:sortBy&StartPage=:startPage&PageSize=:pageSize',
            resource = $resource(url,
                {
                    sortBy: '@sortBy',
                    startPage: '@startPage',
                    pageSize: '@pageSize'                    
                },
                {
                    // get: {
                        // method: 'GET',
                        // headers: userSession.getAuthorization()
                    // }
                });
                
        function getCategiries(sortBy, startPage, pageSize) {
            return resource.get({
                sortBy: sortBy,
                startPage: startPage,
                pageSize: pageSize
            }).$promise;
        }
        
        return {
            get: getCategiries
        };
    }
]);
