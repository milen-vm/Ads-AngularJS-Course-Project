'use strict';

app.controller('TopNavBar', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        $scope.viewName = '';
        // EventListener
        $scope.$on('viewNameChanged', function(ev, viewName) {
            $scope.viewName = viewName;
        });
    }
]);
