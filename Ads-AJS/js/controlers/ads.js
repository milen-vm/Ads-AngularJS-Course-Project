'use strict';

app.controller('AdsList', function($scope, $log, httpRequest) {
    var ADS_PER_PAGE = 10,
        PAGER_MAX_SIZE = 5;
        
    $scope.currentPage = 1;
    $scope.maxSize = PAGER_MAX_SIZE;
    $scope.adsPerPage = ADS_PER_PAGE;
    $scope.categorie = {};
    $scope.town = {};
    
    loadAds(ADS_PER_PAGE, $scope.currentPage);
    loadFilterData('categories');
    loadFilterData('towns');
     
    // Loading content   
    function loadAds(pageSize, startPage) {
        httpRequest.getAds(pageSize, startPage).then(
            function(data) {
                $scope.adsList = data;
                $scope.totalAds = $scope.adsList.numItems;
            },
            function(error) {
                console.log(error);
            });           
    }
    
    function loadFilterData(type) {
        httpRequest.getFilterData(type).then(
            function(data) {
                $scope[type] = data;
            },
            function(error) {
                console.log(error);
            });
    }
    
    // Filtering ads
    $scope.filterItemChnaged = function() {
        var categorieId = $scope.categorieId || '',
            townId = $scope.townId || '';

        httpRequest.getFilteredAds(categorieId, townId).then(
            function(data) {
                $scope.adsList = data;
                $scope.totalAds = $scope.adsList.numItems;
            },
            function(error) {
                console.log(error);
            });
    };
    
    // Pagination
    $scope.setPage = function (pageNo) {
        console.log(pageNo);
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
        // console.log('Page changed to: ' + $scope.currentPage);
        loadAds(ADS_PER_PAGE, $scope.currentPage);
    };

});
