'use strict';

app.controller('UserProfileEdit', ['$scope', '$rootScope', '$route', 'userData', 'townsData',
    function($scope, $rootScope, $route, userData, townsData) {
        var EDIT_USER_PROFILE_VIEW_NAME = 'Edit User Profile';
        $scope.userData = {};
        $scope.passData = {};
        $scope.towns = {};
        
        $scope.loadUserData = function() {
            userData.getUser().then(
                function(data) {
                    $scope.userData = data;
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                });
        };
        
        $scope.editUserProfile = function() {
            userData.editUser($scope.userData).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $route.reload();
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                });
        };
        
        $scope.passwordChange = function() {
            userData.changePassword($scope.passData).then(
                function(data) {
                    $scope.successOccurred(data.message);
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                });
        };
        
        // Load towns
        townsData.getTowns().then(
            function(data) {
                $scope.towns = data;
            },
            function(error) {
                console.log(error);
            }
        );
        
        // Events
        $scope.viewChangedToEditUserProfile = function() {
            $rootScope.$broadcast('viewNameChanged', EDIT_USER_PROFILE_VIEW_NAME);
        };
        
        $scope.successOccurred = function(message) {
            $rootScope.$broadcast('operationSuccess', message);
        };
        
        $scope.errorOccurred = function(message) {
            $rootScope.$broadcast('operationFailure', message);
        };
        
        $scope.viewChangedToEditUserProfile();
        $scope.loadUserData();
    }
]);
