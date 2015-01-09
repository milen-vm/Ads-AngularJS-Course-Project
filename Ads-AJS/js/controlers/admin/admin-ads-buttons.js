'use strict';

app.controller('AdminButtons', ['$scope', '$location', 'adIdTransfer',
    function($scope, $location, adIdTransfer) {
        
        $scope.adminEditAdClicked = function(id) {
            adIdTransfer.id = id;
            $location.path('/admin-edit-ad');
        };
    }
]);
