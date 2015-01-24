'use strict';

app.controller('AdminCategories', ['$scope', '$rootScope', 'adminCategories', 'constValue',
    function($scope, $rootScope, adminCategories, constValue) {
        $scope.itemPerPage = constValue.itemsPerPage;
        $scope.currentPage = 1;
        $scope.sortUsersBy = 'Name';
        $scope.reverseSort = false;
        // $scope.pagerMaxSize = 5;
        
         $scope.loadCategories = function() {
            adminCategories.getAll($scope.sortUsersBy, $scope.currentPage, $scope.itemPerPage).then(
                function(data) {
                    $scope.categories = data.categories;
                    $scope.totalItems = data.numItems;
                    $scope.itemsCountReceived();
                },
                function(error) {
                    $scope.errorOccurred(error.data);
                }
            );
        };      
        
        $scope.sortByPropertyClicked = function(userProperty) {
            if ($scope.reverseSort) {
                $scope.sortUsersBy = '-' + userProperty;
            } else {
                $scope.sortUsersBy = userProperty;
            };
            
            $scope.loadCategories();
        };
        
        // Delete category
        $scope.deleteCategorieClicked = function(categorie) {
            $scope.categorieForDeleting = categorie;
        };
        
        $scope.deleteCategorieConfirmed = function() {
            var id = $scope.categorieForDeleting.id;
            
            adminCategories.delete(id).then(
                function(data) {
                    console.log(data);
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                }
            );
        };
        
        // Create category
        $scope.adminCreateCategory = function() {
            console.log($scopenewCategory);
            adminCategories.create($scope.newCategory).then(
                function(data) {
                    console.log(data);
                },
                function(error) {
                    console.log(error);
                }
            );
        };
        // Events
        $scope.viewNameChanged = function() {           
            $rootScope.$broadcast('viewNameChanged', 'Categories');
        };
        
        $scope.itemsCountReceived = function() {
            $rootScope.$broadcast('itemsCountReceived', $scope.totalItems);
        };
        
        $scope.errorOccurred = function(message) {
            $rootScope.$broadcast('operationFailure', message);
        };
        
        // EventListener
        $scope.$on('currentPageChanged', function(ev, newPage) {
            $scope.currentPage = newPage;
            $scope.loadCategories();
        });
        
        // Pagination
        // $scope.pageChanged = function() {
            // $scope.loadCategories();
        // };
        
        $scope.viewNameChanged();
        $scope.loadCategories();
    }
]);
