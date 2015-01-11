'use strict';

app.controller('AdminUserEdit', ['$scope', '$rootScope', '$location', 'adminUsers', 'townsData', 'adIdTransfer',
    function($scope, $rootScope, $location, adminUsers, townsData, adIdTransfer) {
        $scope.userForEdit = adIdTransfer.id;
        adIdTransfer.id = null;
        // $scope.userForDeleting = {};
        
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
                    console.log(error);
                    $scope.errorOccurred(error.message);
                }
            );
        };
        
        // Delete user
        $scope.deleteUserClicked = function(user) {
            $scope.userForDeleting = user;
            console.log(user + ' ho');
            console.log($scope.userForDeleting);
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
        
        $scope.viewNameChanged();
    }
]);
