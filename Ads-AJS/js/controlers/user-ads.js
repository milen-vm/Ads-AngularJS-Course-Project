'use strict';

app.controller('UserAds', ['$scope', '$rootScope', 'adsData', 'userSession',
    function($scope, $rootScope, adsData, userSession) {
        var USER_ADS_VIEW_NAME = 'My Ads',
            ADS_PER_PAGE = 10,
            PAGER_MAX_SIZE = 5;
        
        $scope.userAds = {};    
        $scope.currentPage = 1;
        $scope.pagerMaxSize = PAGER_MAX_SIZE;
        $scope.adsPerPage = ADS_PER_PAGE;
         
        $scope.loadUserAds = function () {
            var accessToken = userSession.getAccessToken();   
            
            adsData.getUserAds($scope.adsPerPage, $scope.currentPage, accessToken, '').then(
                function(data) {
                    $scope.userAds = data;
                    $scope.totalAds = $scope.userAds.numItems;
                },
                function(error) {
                    console.log(error);
                });           
        };
        
        $scope.deactivateAd = function(id) {
            var accessToken = userSession.getAccessToken();
            
            adsData.deactiveAd(id, accessToken).then(
                function(data) {
                    console.log(data);
                },
                function(error) {
                   console.log(error); 
                });
        };
        
        // Event
        $scope.viewChangedToUserAllAds = function() {
            $rootScope.$broadcast('viewNameChanged', USER_ADS_VIEW_NAME);
        };
        
        // EventListener
        $scope.$on('inactiveAdsSelected', function(ev) {
            $scope.viewName = viewName;
        });
        
        // Pagination
        $scope.pageChanged = function() {
            $scope.loadUserAds();
        };
        
        $scope.loadUserAds();
        $scope.viewChangedToUserAllAds();
    }
]);
