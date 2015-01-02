'use strict';

app.controller('TopNavBar', ['$scope', '$rootScope', 'userSession',
    function($scope, $rootScope, userSession) {
        $scope.viewName = '';
        $scope.username = '';        
        $scope.showUsername = false;
        
        $scope.isUserLoggedIn = function() {
            var hasUser = userSession.hasUser();
            if (hasUser) {
                $scope.username = userSession.getUsername();
                $scope.showUsername = true;
            } else{};
        };
        
        $scope.logoutUser = function() {
            userSession.removeUser();
            $scope.showUsername = false;
        };
        
        // EventListeners
        $scope.$on('viewNameChanged', function(ev, viewName) {
            $scope.viewName = viewName;
        });
        
        $scope.$on('userLoggedIn', function(ev) {
            $scope.username = userSession.getUsername();
            $scope.showUsername = true;
        });
        
        $scope.isUserLoggedIn();
    }
]);
