'use strict';

app.controller('RegistrationForm', ['$scope', '$rootScope', '$location', 'userSession', 'townsData', 'userData',
    function($scope, $rootScope, $location, userSession, townsData, userData) {
        var REGISTER_VIEW_NAME = 'Registration';
                
        $scope.towns = {};
        $scope.regUserData = {};
    
        $scope.registerUser = function() {
            console.log($scope.regUserData);
            userData.registerUser($scope.regUserData).then(
                function(data) {
                    var username = data.username,
                        accessToken = data.access_token;
                        
                    userSession.saveUser(username, accessToken);
                    $scope.userLoggedIn();
                    $location.path('#/');
                },
                function(error) {
                    console.log(error);
                });
        };
        
        townsData.getTowns().then(
            function(data) {
                $scope.towns = data;
            },
            function(error) {
                console.log(error);
            }
        );
        
        // Events
        $scope.viewChangedToHome = function() {
            $rootScope.$broadcast('viewNameChanged', REGISTER_VIEW_NAME);
        };
        
        $scope.userLoggedIn = function() {
            $rootScope.$broadcast('userLoggedIn');
        };
        
        $scope.viewChangedToHome();
    }
]);
