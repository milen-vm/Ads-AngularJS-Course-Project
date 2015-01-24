'use strict';

app.controller('AdminUsersList', ['$scope', '$rootScope', '$location', 'adminUsers', 'dataTransfer',
    function($scope, $rootScope, $location, adminUsers, dataTransfer) {
        $scope.usersPerPage = 10;
        $scope.currentPage = 1;
        $scope.pagerMaxSize = 5;        
        $scope.sortUsersBy = 'UserName';
        $scope.reverseSort = false;
        
        $scope.loadUsers = function() {
            adminUsers.getAll($scope.sortUsersBy, $scope.currentPage, $scope.usersPerPage).then(
                function(data) {
                    $scope.totalUsers = data.numItems;
                    $scope.usersList = data.users;
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                }
            );
        };
        
        $scope.sortByPropertyClicked = function(userProperty) {
            if ($scope.reverseSort) {
                $scope.sortUsersBy = '-' + userProperty;
            } else {
                $scope.sortUsersBy = userProperty;
            };
            
            $scope.loadUsers();
        };
        
        $scope.editUserClicked = function(user) {
            dataTransfer.data = user;
            $location.path('/admin-user-edit');
        };
        
        // Delete user
        $scope.deleteUserClicked = function(user) {
            $scope.userForDeleting = user;
        };
        
        $scope.adminDeleteUserConfirmed = function() {
            var username = $scope.userForDeleting.username;
            
            adminUsers.deleteUser(username).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $scope.loadUsers();
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                }
            );
        };
        
        // Event
        $scope.viewNameChanged = function() {           
            $rootScope.$broadcast('viewNameChanged', 'Users');
        };
        
        $scope.successOccurred = function(message) {
            $rootScope.$broadcast('operationSuccess', message);
        };
        
        $scope.errorOccurred = function(message) {
            $rootScope.$broadcast('operationFailure', message);
        };
        
        // Pagination
        $scope.pageChanged = function() {
            $scope.loadUsers();
        };
        
        $scope.viewNameChanged();
        $scope.loadUsers();
    }
]);
