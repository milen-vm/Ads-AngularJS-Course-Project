'use strict';

app.controller('loginForm', ['$scope', '$rootScope','userData', 'userSession',
    function($scope, $rootScope, userData, userSession) {
        var LOGIN_VIEW_NAME = 'Login';
        
        $scope.loginUserData = {};
        
        $scope.loginUser = function() {
            userData.loginUser($scope.loginUserData).then(
                function(data) {
                    var username = $scope.loginUserData.username,
                        accessToken = data.access_token;
                        
                    // $cookieStore.put('accessToken', data.access_token);
                    userSession.saveUser(username, accessToken);
                    console.log(userSession.getUsername());
                    console.log(userSession.getAccessToken());
                },
                function(error) {
                    console.log(error);
                });
        };
        
        // Event trigger. Set view name to TopNavBar controller
        $scope.viewChangedToLogin = function() {
            $rootScope.$broadcast('viewNameChanged', LOGIN_VIEW_NAME);
        };
        
        $scope.viewChangedToLogin();
    }
]);
