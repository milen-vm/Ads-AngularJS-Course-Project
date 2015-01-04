'use strict';

app.controller('AdsList', ['$scope', '$rootScope', 'adsData',
    function($scope, $rootScope, adsData) {
        var ADS_PER_PAGE = 10,
            PAGER_MAX_SIZE = 5,
            HOME_VIEW_NAME = 'Home';
        
        $scope.adsParams = {
            categoryId: '',
            townId: ''        
        };        
        $scope.currentPage = 1;
        $scope.pagerMaxSize = PAGER_MAX_SIZE;
        $scope.adsPerPage = ADS_PER_PAGE;
        
         // EventListeners
         $scope.$on('categorySelectionChanged', function(ev, selectedCategorieId) {
             $scope.adsParams.categoryId = selectedCategorieId;
             $scope.loadAds();
         });
         
         $scope.$on('townSelectionChanged', function(ev, selectedTownId) {
             $scope.adsParams.townId = selectedTownId;
             $scope.loadAds();
         });
        
        // Loading ads   
        $scope.loadAds = function () {
            var categoryId = $scope.adsParams.categoryId,
                townId = $scope.adsParams.townId;
                
            adsData.getAds(categoryId, townId, $scope.adsPerPage, $scope.currentPage).then(
                function(data) {
                    $scope.adsList = data;
                    $scope.totalAds = $scope.adsList.numItems;
                },
                function(error) {
                    console.log(error);
                });           
        };
        
        // Event trigger. Set view name to TopNavBar controller
        $scope.viewChangedToHome = function() {
            $rootScope.$broadcast('viewNameChanged', HOME_VIEW_NAME);
        };
        
        // Pagination
        $scope.setPage = function (pageNo) {    // not needed
            console.log(pageNo);
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            $scope.loadAds();
        };
        
        
        
        $scope.loadAds();
        $scope.viewChangedToHome();
    }
]);
