'use strict';

app.controller('AdsList', function($scope, $log, adsData) {
    var ADS_PER_PAGE = 10,
        PAGER_MAX_SIZE = 5;
        
    $scope.currentPage = 1;
    $scope.maxSize = PAGER_MAX_SIZE;
    $scope.adsPerPage = ADS_PER_PAGE;
    
    loadAds(ADS_PER_PAGE, $scope.currentPage);
       
    function loadAds(pageSize, startPage) {
        adsData.getAds(pageSize, startPage).then(
            function(data) {
                $scope.adsList = data;
                $scope.totalAds = $scope.adsList.numItems;
                console.log('request from loadAds');
            },
            function(error) {
                console.log(error);
            });
    }
    
    // pagination
    $scope.setPage = function (pageNo) {
        console.log(pageNo);
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
        console.log('request from page cahnged');
        loadAds(ADS_PER_PAGE, $scope.currentPage);
    };

});
