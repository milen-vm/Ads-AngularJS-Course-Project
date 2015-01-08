'use strict';

app.controller('UserAds', ['$scope', '$rootScope', '$location', '$route', 'userAds', 'adIdTransfer',
    function($scope, $rootScope, $location, $route, userAds, adIdTransfer) {
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
            
            userAds.getUserAds($scope.adsPerPage, $scope.currentPage, $scope.adsStatus).then(
                function(data) {
                    $scope.userAds = data;
                    $scope.totalAds = $scope.userAds.numItems;
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                });           
        };
        
        $scope.deactivateAd = function(id) {            
            userAds.deactiveAd(id).then(
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
           userAds.deleteAd(id).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $route.reload();
                },
                function(error) {
                   $scope.errorOccurred(error.message);
                });            
        };
        
        $scope.publishAgainClicked = function(id) {
            
            userAds.publishAgainAd(id).then(
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
