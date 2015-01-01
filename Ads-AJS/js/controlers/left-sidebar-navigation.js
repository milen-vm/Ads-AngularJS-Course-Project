'use strict';

app.controller('LeftSideBarNavigation', ['$scope', '$location',
    function($scope, $location) {
        
        // Adds active state on navigation buttons
        $scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.path());
            return active;
        };
    }
]);
