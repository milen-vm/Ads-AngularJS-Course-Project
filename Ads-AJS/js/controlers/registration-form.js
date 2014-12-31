'use strict';

app.controller('RegistrationForm', ['$scope', '$rootScope', 'townsData',
    function($scope, $rootScope, townsData) {
        var REGISTER_VIEW_NAME = 'Registration';
                
        $scope.towns = {};
        
        townsData.getTowns().then(
            function(data) {
                $scope.towns = data;
            },
            function(error) {
                console.log(error);
            }
        );
        
        // Event trigger. Set view name to TopNavBar controller
        $scope.viewChangedToHome = function() {
            $rootScope.$broadcast('viewNameChanged', REGISTER_VIEW_NAME);
        };
        
        $scope.viewChangedToHome();
    }
]);
