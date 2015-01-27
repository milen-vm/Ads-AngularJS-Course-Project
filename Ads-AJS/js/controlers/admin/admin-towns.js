'use strict';

app.controller('AdminTownsList', ['$scope', '$rootScope', 'adminTowns', 'constValue',
    function($scope, $rootScope, adminTowns, constValue) {
        $scope.itemPerPage = constValue.itemsPerPage;
        $scope.currentPage = 1;
        $scope.pagerMaxSize = 5;
        $scope.sortTownsBy = 'Name';
        $scope.reverseSort = false;
        
        $scope.loadTowns = function() {
            adminTowns.getAll($scope.sortTownsBy, $scope.currentPage, $scope.itemPerPage).then(
                function(data) {
                    $scope.towns = data.towns;
                    $scope.totalItems = data.numItems;
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                }
            );
        };
        
        $scope.sortByPropertyClicked = function(townProperty) {
            if ($scope.reverseSort) {
                $scope.sortTownsBy = '-' + townProperty;
            } else {
                $scope.sortTownsBy = townProperty;
            };
            
            $scope.loadTowns();
        };
        
        // Create town
        $scope.adminCreateTown = function() {
            adminTowns.create($scope.newTown).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $scope.loadTowns();
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                }
            );
        };
        
        // Edit town
        $scope.editTownClicked = function(category) {
            $scope.editedTown = {};
            $scope.editedTown.name = category.username;
            $scope.editedTown.id = category.id;
            
        };
        
        $scope.adminEditTown = function() {
            var id = $scope.editedTown.id;
            delete $scope.editedTown.id;
            
            adminTowns.edit($scope.editedTown, id).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $scope.loadTowns();
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                }
            );
        };
        
        // Delete town
        $scope.deleteTownClicked = function(town) {
            $scope.townForDeleting = town;
        };
        
        $scope.deleteTownConfirmed = function() {
            var id = $scope.townForDeleting.id;
            
            adminTowns.delete(id).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $scope.loadTowns();
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                }
            );
        };
        
        // Events
        $scope.viewNameChanged = function() {           
            $rootScope.$broadcast('viewNameChanged', 'Towns');
        };

        $scope.successOccurred = function(message) {
            $rootScope.$broadcast('operationSuccess', message);
        };
        
        $scope.errorOccurred = function(message) {
            $rootScope.$broadcast('operationFailure', message);
        };
        
        // Pagination
        $scope.pageChanged = function() {
            $scope.loadTowns();
        };
        
        $scope.viewNameChanged();
        $scope.loadTowns();
    }
]);
