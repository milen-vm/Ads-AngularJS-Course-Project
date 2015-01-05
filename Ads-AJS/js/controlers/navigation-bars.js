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
            $location.path('/');
            $window.location.reload();
        };
        
        // Adds active state on navigation buttons
        $scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.path());
            
            return active;
        };
        
        //Event
        $scope.allClicked = function() {
            $rootScope.$broadcast('adsStatusChanged', '');
        };
        
        $scope.publishedCliked = function() {
            $rootScope.$broadcast('adsStatusChanged', 'Published');
        };
        
        $scope.inactiveClicked = function() {
            $rootScope.$broadcast('adsStatusChanged', 'Inactive');
        };
        
        $scope.waitingApprovalClicked = function() {
            $rootScope.$broadcast('adsStatusChanged', 'WaitingApproval');
        };
        
        $scope.rejectedClicked = function() {
            $rootScope.$broadcast('adsStatusChanged', 'Rejected');
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
        // console.log(userSession.getAccessToken());
    }
]);
