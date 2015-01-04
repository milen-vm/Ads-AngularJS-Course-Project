'use strict';

app.controller('LoginForm', ['$scope', '$rootScope', '$location','userData', 'userSession',
    function($scope, $rootScope, $location, userData, userSession) {
        var LOGIN_VIEW_NAME = 'Login';
        
        $scope.loginUserData = {};
        
        $scope.loginUser = function() {
            userData.loginUser($scope.loginUserData).then(
                function(data) {
                    var username = $scope.loginUserData.username,
                        accessToken = data.access_token;
                        
                    userSession.saveUser(username, accessToken);
                    $scope.userLoggedIn();
                    $location.path('#/');
                },
                function(error) {
                    console.log(error);
                });
        };
        
        // Events
        $scope.viewChangedToLogin = function() {
            $rootScope.$broadcast('viewNameChanged', LOGIN_VIEW_NAME);
        };
        
        $scope.userLoggedIn = function() {
            $rootScope.$broadcast('userLoggedIn');
        };
        
        $scope.viewChangedToLogin();
    }
]);