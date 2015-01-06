'use strict';

app.factory('userSession', function($cookieStore) {
    
    function saveUserData(username, accessToken) {
        var user = {
            username: username,
            accessToken: accessToken
        };
        // console.log(accessToken);
        
        $cookieStore.put('user', user);
    }
    
    function getUsername() {
        var user = $cookieStore.get('user');
        
        if (user.username) {
            return user.username;
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
        }
        
        return false;
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
