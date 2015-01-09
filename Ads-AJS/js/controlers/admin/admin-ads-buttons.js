'use strict';

app.controller('AdminButtons', ['$scope', '$rootScope', '$route', '$location', 'adminAds', 'adIdTransfer',
    function($scope, $rootScope, $route, $location, adminAds, adIdTransfer) {
        
        $scope.adminEditAdClicked = function(id) {
            adIdTransfer.id = id;
            $location.path('/edit-ad');
        };
        
        $scope.adminRejectAdClicked = function(id) {
            adminAds.rejectAd(id).then(
                function(data) {
                    $scope.successOccurred(data.message);
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                    $route.reload();
                }
            );
        };
        
        // Events
        $scope.successOccurred = function(message) {
            $rootScope.$broadcast('operationSuccess', message);
        };
        
        $scope.errorOccurred = function(message) {
            $rootScope.$broadcast('operationFailure', message);
        };
    }
]);
