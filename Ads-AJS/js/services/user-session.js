'use strict';

app.factory('userSession', function($cookieStore) {
    
    function saveUserData(userName, accessToken) {
        var user = {
            userName: userName,
            accessToken: accessToken
        };
        console.log(accessToken);
        
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
    
    function hasUserData() {
        var user = $cookieStore.get('user');
        
        if (user) {
            return true;
        } else {
            return false;
        };
    }
    
    function removeUserData() {
        $cookieStore.remove('user');
    }
    
    return {
        saveUser: saveUserData,
        getUsername: getUsername,
        getAccessToken: getAccessToken,
        hasUser: hasUserData,
        removeUser: removeUserData
    };
});
