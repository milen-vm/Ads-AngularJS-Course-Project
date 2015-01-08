'use strict';

app.controller('AdsList', ['$scope', '$rootScope', 'userAds', 'adminAds', 'userSession',
    function($scope, $rootScope, userAds, adminAds, userSession) {
        var ADS_PER_PAGE = 10,
            PAGER_MAX_SIZE = 5,
            USER_VIEW_NAME = 'Home',
            ADMIN_VIEW_NAME = 'Ads';
            
        $scope.isAdmin = false;
        $scope.adsParams = {
            categoryId: '',
            townId: ''        
        };        
        $scope.currentPage = 1;
        $scope.pagerMaxSize = PAGER_MAX_SIZE;
        $scope.adsPerPage = ADS_PER_PAGE;
        
        $scope.isAdminLogedIn = function() {
            if (userSession.hasUser()) {
                $scope.isAdmin = userSession.isAdmin();
            };
        };
     
        // Loading ads   
        $scope.loadAds = function () {
            var categoryId = $scope.adsParams.categoryId,
                townId = $scope.adsParams.townId;
            
            if ($scope.isAdmin) {
                adminAds.getAdminAds(categoryId, townId, $scope.adsPerPage, $scope.currentPage).then(
                function(data) {
                    $scope.adsList = data;
                    $scope.totalAds = $scope.adsList.numItems;
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                });
                
            } else {
                userAds.getAds(categoryId, townId, $scope.adsPerPage, $scope.currentPage).then(
                function(data) {
                    $scope.adsList = data;
                    $scope.totalAds = $scope.adsList.numItems;
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                });
            };    
                       
        };
        
        // Event
        $scope.viewNameChanged = function() {
            var viewName = $scope.isAdmin ? ADMIN_VIEW_NAME : USER_VIEW_NAME;
            
            $rootScope.$broadcast('viewNameChanged', viewName);
        };
        
        $scope.errorOccurred = function(message) {
            $rootScope.$broadcast('operationFailure', message);
        };
        
         // EventListeners
         $scope.$on('categorySelectionChanged', function(ev, selectedCategorieId) {
             $scope.adsParams.categoryId = selectedCategorieId;
             $scope.loadAds();
         });
         
         $scope.$on('townSelectionChanged', function(ev, selectedTownId) {
             $scope.adsParams.townId = selectedTownId;
             $scope.loadAds();
         });
        
        // Pagination
        $scope.pageChanged = function() {
            $scope.loadAds();
        };
        
        
        $scope.isAdminLogedIn();
        $scope.loadAds();
        $scope.viewNameChanged();
    }
]);
