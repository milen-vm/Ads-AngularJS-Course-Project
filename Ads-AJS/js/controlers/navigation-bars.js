'use strict';

app.controller('NavigationBars', ['$scope', '$rootScope', '$location', 'userSession',
    function($scope, $rootScope, $location, userSession) {
        $scope.viewName = '';
        $scope.username = '';        
        $scope.hasUser = false;
        
        $scope.isUserLoggedIn = function() {
            if (userSession.hasUser()) {
                $scope.username = userSession.getUsername();
                $scope.hasUser = true;
            };
        };
        
        $scope.logoutUser = function() {
            userSession.removeUser();
            $scope.hasUser = false;
        };
        
        // Adds active state on navigation buttons
        $scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.path());
            
            return active;
        };
        
        // EventListeners
        $scope.$on('viewNameChanged', function(ev, viewName) {
            $scope.viewName = viewName;
        });
        
        $scope.$on('userLoggedIn', function(ev) {
            $scope.username = userSession.getUsername();
            $scope.hasUser = true;
        });
        
        $scope.isUserLoggedIn();
    }
]);
