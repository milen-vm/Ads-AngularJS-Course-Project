'use strict';

app.controller('AlertMessages', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        $scope.hasSuccess = false;
        $scope.hasError = false;
        $scope.successMessage = '';
        $scope.errorMessage = '';
        
        $scope.hideSuccessAlert = function() {
            $scope.hasSuccess = false;
        };
        
        $scope.hideErrorAlert = function() {
            $scope.hasError = false;
        };
        
        // EventListeners       
        $scope.$on('operationSuccess', function(ev, message) {
            $scope.successMessage = message;
            $scope.hasSuccess = true;
        });
        
        $scope.$on('operationFailure', function(ev, message) {
            $scope.errorMessage = message;
            $scope.hasError = true;
        });
    }
]);