'use strict';

app.controller('RightSideBarFilters', ['$scope', '$rootScope', 'categoriesData', 'townsData',
    function($scope, $rootScope, categoriesData, townsData) {
        $scope.categories = {};
        $scope.towns = {};
        
        categoriesData.getCategories().then(
            function(data) {                
                $scope.categories = data;
            },
            function(error) {
                console.log(error);
            }
        );
        
        townsData.getTowns().then(
            function(data) {
                $scope.towns = data;
            },
            function(error) {
                console.log(error);
            }
        );
        
        // Events
        $scope.categorieChanged = function() {
            var selectedCategorieId = $scope.categorieId || '';
            $rootScope.$broadcast('categorySelectionChanged', selectedCategorieId);
        };
        
        $scope.townChanged = function() {
            var selectedTownId = $scope.townId || '';
            $rootScope.$broadcast('townSelectionChanged', selectedTownId);
        };
    }
]);
