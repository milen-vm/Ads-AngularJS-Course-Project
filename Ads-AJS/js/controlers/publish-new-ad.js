'use strict';

app.controller('PublishNewAd', ['$scope', '$rootScope', '$location', 'categoriesData', 'townsData', 'userAds',
    function($scope, $rootScope, $location, categoriesData, townsData, userAds) {
        var PUBLISH_NEW_AD_NAME = 'Publish New Ad';
        
        $scope.newAdData = {townId: null, categoryId: null};
        $scope.categories = {};
        $scope.towns = {};
        
        // Load local image file
        $scope.fileSelected = function(fileInputField) {
            delete $scope.newAdData.imageDataUrl;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.newAdData.imageDataUrl = reader.result;
                    $("#image-box").html("<img src='" + reader.result + "'>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };
        
        $scope.publishNewAd = function() {           
            userAds.createNewAd($scope.newAdData).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $location.path('/user-ads');
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                });
        };
        
        // Load categories
        categoriesData.getCategories().then(
            function(data) {                
                $scope.categories = data;
            },
            function(error) {
                console.log(error);
            }
        );
        // Load towns
        townsData.getTowns().then(
            function(data) {
                $scope.towns = data;
            },
            function(error) {
                console.log(error);
            }
        );
        
        // Events
        $scope.viewChangedToPublishNewAd = function() {
            $rootScope.$broadcast('viewNameChanged', PUBLISH_NEW_AD_NAME);
        };
        
        $scope.successOccurred = function(message) {
            $rootScope.$broadcast('operationSuccess', message);
        };
        
        $scope.errorOccurred = function(message) {
            $rootScope.$broadcast('operationFailure', message);
        };
        
        $scope.viewChangedToPublishNewAd();
    }
]);
