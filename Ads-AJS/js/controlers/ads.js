'use strict';

app.controller('AdsList', function($scope, adsData) {
    adsData.getAds().then(
        function(data) {
            $scope.adsList = data;
        },
        function(error) {
            console.log(error);
        });
});
