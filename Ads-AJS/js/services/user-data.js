'use strict';

app.factory('userData', function($http, $q, userSession) {
    var baseUrl = 'http://softuni-ads.azurewebsites.net/api/user/',
        accessToken = userSession.getAccessToken(),
        headers = { 'Authorization': 'Bearer ' + accessToken }; 
    
    function userDataRequest(url, method, data, headers) {
        var defer = $q.defer();
        
        $http({
            method: method,
            url: url,
            headers: headers,
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
        
        return userDataRequest(url, 'POST', data, null);
    }
    
    function registerUser(data) {
        var url = baseUrl + 'register';
        
        return userDataRequest(url, 'POST', data, null);
    }
    
    function getUserData() {
        var url = baseUrl + 'profile';
        
        return userDataRequest(url, 'GET', null, headers);
    }
    
    return {
        loginUser: loginUser,
        registerUser: registerUser,
        getUser: getUserData
    };
});
