'use strict';

app.factory('userSession', function($cookieStore) {
    
    function saveUserData(userName, accessToken) {
        var user = {
            userName: userName,
            accessToken: accessToken
        };
        
        $cookieStore.put('user', user);
    }
    
    function getUsername() {
        var user = $cookieStore.get('user');
        
        if (user.userName) {
            return user.userName;
        };
    }
    
    function getAccessToken() {
        var user = $cookieStore.get('user');
        
        if (user.accessToken) {
            return user.accessToken;
        };
    }
    
    function removeUserData() {
        $cookieStore.remove('user');
    }
    
    return {
        saveUser: saveUserData,
        getUsername: getUsername,
        getAccessToken: getAccessToken,
        removeUser: removeUserData
    };
});
