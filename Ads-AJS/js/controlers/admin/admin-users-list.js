'use strict';

app.controller('AdminUsersList', ['$scope', '$rootScope', 'adminUsers',
    function($scope, $rootScope, adminUsers) {
        $scope.usersPerPage = 10;
        $scope.currentPage = 1;
        $scope.pagerMaxSize = 5;        
        $scope.sortUsersBy = '';
        $scope.reverseSort = false;
        
        $scope.loadUsers = function() {
            console.log($scope.sortUsersBy);
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
        
        // Event
        $scope.viewNameChanged = function() {           
            $rootScope.$broadcast('viewNameChanged', 'Users');
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
