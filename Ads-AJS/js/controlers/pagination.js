'use strict';

app.controller('Pagination', ['$scope', '$rootScope', 'constValue',
    function($scope, $rootScope, constValue) {
        $scope.currentPage = 1;
        $scope.itemsPerPage = constValue.itemsPerPage; 
        $scope.pagerMaxSize = constValue.pagerMaxSize;
        
        $scope.pageChanged = function() {
            $scope.currentPageChanged($scope.currentPage);
        };
        
        // Events
        $scope.currentPageChanged = function(newPage) {           
            $rootScope.$broadcast('currentPageChanged', newPage);
        };
        
        // EventListener
        $scope.$on('itemsCountReceived', function(ev, totalItems) {
            $scope.totalItems = totalItems;
        });
    }
]);
