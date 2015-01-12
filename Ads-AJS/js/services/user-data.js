'use strict';

app.factory('userData', ['userSession', 'httpData', 'constValue',
    function(userSession, httpData, constValue) {
        var baseUrl = constValue.baseUrl + 'user/';
        
        function getAuthorizationHeaders() {
            var accessToken = userSession.getAccessToken();
            
            return { 'Authorization': 'Bearer ' + accessToken };
        }
        
        function loginUser(data) {
            var url = baseUrl + 'login';
            
            return httpData.request(url, 'POST', data, null);
        }
        
        function registerUser(data) {
            var url = baseUrl + 'register';
            
            return httpData.request(url, 'POST', data, null);
        }
        
        function getUserData() {
            var url = baseUrl + 'profile',
                headers = getAuthorizationHeaders();
            
            return httpData.request(url, 'GET', null, headers);
        }
        
        function editUserProfile(data) {
            var url = baseUrl + 'profile',
                headers = getAuthorizationHeaders();
    
            return httpData.request(url, 'PUT', data, headers);
        }
        
        function changeUserPassword(data) {
            var url = baseUrl + 'changepassword',
                headers = getAuthorizationHeaders();
                
            return httpData.request(url, 'PUT', data, headers);
        }
        
        return {
            loginUser: loginUser,
            registerUser: registerUser,
            getUser: getUserData,
            editUser: editUserProfile,
            changePassword: changeUserPassword
        };
    }
]);
