'use strict';

app.controller('RegistrationForm', ['$scope', '$rootScope', 'townsData',
    function($scope, $rootScope, townsData) {
        var REGISTER_VIEW_NAME = 'Registration';
                
        $scope.towns = {};
        $scope.userData = {};
        
        townsData.getTowns().then(
            function(data) {
                $scope.towns = data;
            },
            function(error) {
                console.log(error);
            }
        );
        
        $scope.registerUser = function() {
            console.log($scope.registerForm);
            console.log('registration success');
            // TODO
        };
        
        // Event trigger. Set view name to TopNavBar controller
        $scope.viewChangedToHome = function() {
            $rootScope.$broadcast('viewNameChanged', REGISTER_VIEW_NAME);
        };
        
        $scope.viewChangedToHome();
    }
]);
