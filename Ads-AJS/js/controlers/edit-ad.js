'use strict';

app.controller('EditAd', ['$scope', 'adIdTransfer',
    function($scope, adIdTransfer) {
        var EDIT_AD_VIEW_NAME = 'Edit Ad';
        
        $scope.adId = adIdTransfer.id;
        $scope.adForEditing = {};
        
        
        // Event
        $scope.viewChangedToEditAd = function() {
            $rootScope.$broadcast('viewNameChanged', EDIT_AD_VIEW_NAME);
        };
    }
]);
