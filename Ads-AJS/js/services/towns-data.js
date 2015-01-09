'use strict';

app.factory('townsData', ['httpData', 'constValue',
    function(httpData, constValue) {
        var url = constValue.baseUrl + 'towns';
        
        function getAllTowns() {            
            return httpData.request(url, 'GET', null, null);
        }
    
        return {
            getTowns: getAllTowns
        };
    }
]);