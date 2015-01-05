'use strict';

app.controller('DeleteAd', ['$scope', '$rootScope', 'userSession', 'adsData',
    function($scope, $rootScope, userSession, adsData) {
        var DELETE_AD_VIEW_NAME = 'Delete Ad';
        
        $scope.adForDeleting = {};
        
        $scope.deleteAd = function(id) {
            var accessToken = userSession.getAccessToken();
            
            adsData.deleteAd(id, accessToken).then(
                function(data) {
                    console.log(data);
                },
                function(error) {
                   console.log(error); 
                });
        };
        
        $scope.getAdById = function(id) {
            var accessToken = userSession.getAccessToken();
            
            ads.getAdById(id, accessToken).then(
                function(data) {
                    console.log(data);
                    $scope.adForDeleting = data;
                },
                function(error) {
                   console.log(error); 
                });
        };
        
        // Event
        $scope.viewChangedToDeleteAd = function() {
            $rootScope.$broadcast('viewNameChanged', DELETE_AD_VIEW_NAME);
        };

        // EventListener
        $scope.$on('adForDeleting', function(ev, id) {
            console.log(id);
            $scope.getAdById(id);
        });
        
        $scope.viewChangedToDeleteAd();
    }
]);
