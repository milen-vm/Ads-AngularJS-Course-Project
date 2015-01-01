'use strict';

app.controller('RegistrationForm', ['$scope', '$rootScope', '$cookieStore', 'townsData', 'userData',
    function($scope, $rootScope, $cookieStore, townsData, userData) {
        var REGISTER_VIEW_NAME = 'Registration';
                
        $scope.towns = {};
        $scope.regUserData = {};
        
        townsData.getTowns().then(
            function(data) {
                $scope.towns = data;
            },
            function(error) {
                console.log(error);
            }
        );
        
        $scope.registerUser = function() {
            console.log($scope.regUserData);
            userData.registerUser($scope.regUserData).then(
                function(data) {
                    $cookieStore.put('accessToken',data.access_token);
                },
                function(error) {
                    console.log(error);
                });
        };
        
        // Event trigger. Set view name to TopNavBar controller
        $scope.viewChangedToHome = function() {
            $rootScope.$broadcast('viewNameChanged', REGISTER_VIEW_NAME);
        };
        
        $scope.viewChangedToHome();
    }
]);
