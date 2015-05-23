'use strict';

app.controller('NavigationBars', ['$scope', '$rootScope', '$location', '$route', '$window', 'userSession',
    function($scope, $rootScope, $location, $route, $window, userSession) {
        $scope.adStatus = 'All';
        $scope.viewName = '';
        $scope.username = '';        
        $scope.hasUser = false;
        $scope.isAdmin = false;
        $scope.isCollapsed = true;
        
        $scope.isUserLoggedIn = function() {
            if (userSession.hasUser()) {
                $scope.username = userSession.getUsername();
                $scope.hasUser = true;
                $scope.isAdmin = userSession.isAdmin();
            };
        };
        
        $scope.logoutUser = function() {
            userSession.removeUser();
            $scope.hasUser = false;
            $scope.isAdmin = false;
            
            if ($location.path() === '/') {
                $route.reload();
            } else {
                $location.path('/');
            };           
        };

        // Active state on navigation buttons
        $scope.isActivePath = function (viewLocation) {
            var isActive = (viewLocation === $location.path());
            
            return isActive;
        };
     
        //Events
        $scope.adStatusClicked = function(status) {
             $scope.adStatus = status;
            if (status === 'All') {
                status = '';
            };
            
            $rootScope.$broadcast('adsStatusChanged', status);
        };

        // EventListeners
        $scope.$on('viewNameChanged', function(ev, viewName) {
            $scope.viewName = viewName;
        });
        
        $scope.$on('userLoggedIn', function(ev) {
            $scope.isUserLoggedIn();
        });
        
        $scope.isUserLoggedIn();
    }
]);
