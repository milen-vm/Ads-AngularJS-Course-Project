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
        
        // Create category
        $scope.adminCreateCategory = function() {
            adminCategories.create($scope.newCategory).then(
                function(data) {
                    $scope.successOccurred(data.message);
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                }
            );
        };
        
        // Edit category
        $scope.editCategoryClicked = function(category) {
            $scope.editedCategory = {};
            $scope.editedCategory.name = category.username;
            $scope.editedCategory.id = category.id;
            
        };
        
        $scope.adminEditCategory = function() {
            console.log($scope.editedCategory);
            var id = $scope.editedCategory.id;
            delete $scope.editedCategory.id;
            
            adminCategories.edit($scope.editedCategory, id).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $scope.loadCategories();
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                }
            );
        };
        
        // Delete category
        $scope.deleteCategoryClicked = function(category) {
            $scope.categoryForDeleting = category;
        };
        
        $scope.deleteCategoryConfirmed = function() {
            var id = $scope.categoryForDeleting.id;
            
            adminCategories.delete(id).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $scope.loadCategories();
                },
                function(error) {
                    $scope.errorOccurred(error.message);
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
        
        $scope.successOccurred = function(message) {
            $rootScope.$broadcast('operationSuccess', message);
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
