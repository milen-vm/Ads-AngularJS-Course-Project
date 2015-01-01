'use strict';

app.controller('loginForm', ['$scope', '$rootScope', '$cookieStore', 'userData',
    function($scope, $rootScope, $cookieStore, userData) {
        var LOGIN_VIEW_NAME = 'Login';
        
        $scope.loginUserData = {};
        
        $scope.loginUser = function() {
            userData.loginUser($scope.loginUserData).then(
                function(data) {
                    $cookieStore.put('accessToken',data.access_token);
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
