'use strict';

app.controller('loginForm', ['$scope', '$rootScope', 'userData',
    function($scope, $rootScope, userData) {
        var LOGIN_VIEW_NAME = 'Login';
        
        $scope.loginUserData = {};
        
        $scope.loginUser = function() {
            console.log($scope.loginUserData);
            userData.loginUser($scope.loginUserData).then(
                function(data) {
                    console.log(data);
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
