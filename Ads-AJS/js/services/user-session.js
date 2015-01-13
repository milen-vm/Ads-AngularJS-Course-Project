'use strict';

app.factory('userSession', ['$cookieStore',
    function($cookieStore) {
        
        function saveUserData(username, accessToken, isAdmin) {
            var user = {
                username: username,
                accessToken: accessToken,
                isAdmin: isAdmin
            };
            
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
        
        function isUserAdmin() {
            var user = $cookieStore.get('user');
            
            return user.isAdmin;
        }
        
        function getAuthorization() {
            var accessToken = getAccessToken();
            
            if (accessToken) {
                return { 'Authorization': 'Bearer ' + accessToken };
            };            
        }
        
        return {
            saveUser: saveUserData,
            getUsername: getUsername,
            getAccessToken: getAccessToken,
            hasUser: hasUserData,
            removeUser: removeUserData,
            isAdmin: isUserAdmin,
            getAuthorization: getAuthorization
        };
    }
]);
