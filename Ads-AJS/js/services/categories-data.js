'use strict';

app.factory('categoriesData', ['httpData', 'constValue',
    function(httpData, constValue) {
        var url = constValue.baseUrl + 'categories';
                
        function getAllCategories() {           
            return httpData.request(url, "GET", null, null);
        }
    
        return {
            getCategories: getAllCategories
        };
    }
]);
