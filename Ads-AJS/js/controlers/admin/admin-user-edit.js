'use strict';

app.controller('AdminUserEdit', ['$scope', '$rootScope', '$location', 'adminUsers', 'townsData', 'dataTransfer',
    function($scope, $rootScope, $location, adminUsers, townsData, dataTransfer) {
        $scope.userForEdit = dataTransfer.data || {};
        dataTransfer.data = null;
        $scope.setUserPass = {
            username: $scope.userForEdit.username,
            newPassword: '',
            confirmPassword: ''
        };
        
        // Edit user
        $scope.adminEditUser = function() {
            var username = $scope.userForEdit.username;
            
            delete $scope.userForEdit.$$hashKey;
            delete $scope.userForEdit.townName;
            delete $scope.userForEdit.id;
            
            adminUsers.editProfile(username, $scope.userForEdit).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $location.path('/admin-users-list');
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                }
            );
        };
        
        // Change user password
        $scope.adminPasswordChange = function() {
            adminUsers.setPassword($scope.setUserPass).then(
                function(data) {
                    $scope.successOccurred(data.message);
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                }
            );
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
        $scope.viewNameChanged = function() {           
            $rootScope.$broadcast('viewNameChanged', 'Edit User Profile');
        };
        
        $scope.successOccurred = function(message) {
            $rootScope.$broadcast('operationSuccess', message);
        };
        
        $scope.errorOccurred = function(message) {
            $rootScope.$broadcast('operationFailure', message);
        };
        
        if (!$scope.userForEdit.username) {
            $scope.errorOccurred('User for editing is not sected.');
        };
        
        $scope.viewNameChanged();
    }
]);
