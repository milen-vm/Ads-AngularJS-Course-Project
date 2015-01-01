'use strict';

app.controller('RegistrationForm', ['$scope', '$rootScope', 'townsData',
    function($scope, $rootScope, townsData) {
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
            console.log($scope.registerForm);
            // TODO
        };
        
        // Event trigger. Set view name to TopNavBar controller
        $scope.viewChangedToHome = function() {
            $rootScope.$broadcast('viewNameChanged', REGISTER_VIEW_NAME);
        };
        
        $scope.viewChangedToHome();
    }
]);
