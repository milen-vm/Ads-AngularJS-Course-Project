'use strict';

app.factory('userData', function($http, $q) {
    var baseUrl = 'http://softuni-ads.azurewebsites.net/api/user/';
    
    function userDataRequest(url, data) {
        var defer = $q.defer();
        
        $http({
            method: 'POST',
            url: url,
            data: data
        })
        .success(function(data, status, headers, config) {
            defer.resolve(data);
        })
        .error(function(error, status, headers, config) {
            defer.reject(error);
        });
        
        return defer.promise;
    }
    
    function loginUser(data) {
        var url = baseUrl + 'login';
        
        return userDataRequest(url, data);
    }
    
    return {
        loginUser: loginUser
    };
});
