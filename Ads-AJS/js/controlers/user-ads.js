'use strict';

app.controller('UserAds', ['$scope', '$rootScope', '$location', '$route', 'adsData', 'userSession', 'adIdTransfer',
    function($scope, $rootScope, $location, $route, adsData, userSession, adIdTransfer) {
        var USER_ADS_VIEW_NAME = 'My Ads',
            ADS_PER_PAGE = 10,
            PAGER_MAX_SIZE = 5;
        
        $scope.userAds = {};
        $scope.adForDeleting = {};
        $scope.adForEditing = {};
        $scope.adsStatus = '';   
        $scope.currentPage = 1;
        $scope.pagerMaxSize = PAGER_MAX_SIZE;
        $scope.adsPerPage = ADS_PER_PAGE;
         
        $scope.loadUserAds = function () {
            var accessToken = userSession.getAccessToken();   
            
            adsData.getUserAds($scope.adsPerPage, $scope.currentPage, accessToken, $scope.adsStatus).then(
                function(data) {
                    $scope.userAds = data;
                    $scope.totalAds = $scope.userAds.numItems;
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                });           
        };
        
        $scope.deactivateAd = function(id) {
            var accessToken = userSession.getAccessToken();
            
            adsData.deactiveAd(id, accessToken).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $route.reload();
                },
                function(error) {
                   $scope.errorOccurred(error.message); 
                });
        };
        
        $scope.deleteAdClicked = function(ad) {
            $scope.adForDeleting = ad;
        };
        
        $scope.editAdClicked = function(id) {
            adIdTransfer.id = id;
        };
        
        $scope.deleteAdConfirmed = function(id) {
           var accessToken = userSession.getAccessToken();
                        
           adsData.deleteAd(id, accessToken).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $route.reload();
                },
                function(error) {
                   $scope.errorOccurred(error.message);
                });            
        };
        
        $scope.publishAgainClicked = function(id) {
            var accessToken = userSession.getAccessToken();
            
            adsData.publishAgainAd(id, accessToken).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $route.reload();
                },
                function(error) {
                    $scope.errorOccurred(error.message);                   
                }
            );
        };
        
        // Events
        $scope.viewChangedToUserAllAds = function() {
            $rootScope.$broadcast('viewNameChanged', USER_ADS_VIEW_NAME);
        };
        
        $scope.successOccurred = function(message) {
            $rootScope.$broadcast('operationSuccess', message);
        };
        
        $scope.errorOccurred = function(message) {
            $rootScope.$broadcast('operationFailure', message);
        };
        
        // EventListener
        $scope.$on('adsStatusChanged', function(ev, status) {
            $scope.adsStatus = status;
            $scope.loadUserAds();
        });
        
        // Pagination
        $scope.pageChanged = function() {
            $scope.loadUserAds();
        };
        
        $scope.loadUserAds();
        $scope.viewChangedToUserAllAds();
    }
]);
