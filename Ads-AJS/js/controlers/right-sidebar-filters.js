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
                console.log('in error categ');
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
    }
]);
