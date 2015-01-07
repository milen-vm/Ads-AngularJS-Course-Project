'use strict';

app.controller('EditAd', ['$scope', '$rootScope', '$location', 'adIdTransfer', 'userSession', 'adsData', 'townsData', 'categoriesData',
    function($scope, $rootScope, $location, adIdTransfer, userSession, adsData, townsData, categoriesData) {
        var EDIT_AD_VIEW_NAME = 'Edit Ad';
        
        $scope.adId = adIdTransfer.id;
        adIdTransfer.id = null;
        $scope.adForEditing = {};
        $scope.deleteImage = false;
        $scope.categories = {};
        $scope.towns = {};
        
        $scope.loadAdForEdit = function() {
            var accessToken = userSession.getAccessToken();
            
            if ($scope.adId) {
                adsData.getAdById($scope.adId, accessToken).then(
                function(data) {
                    $scope.adForEditing = data;                                    
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                });
                
            } else {
                $scope.errorOccurred('Ad for editing is not selected.');
            };
            
        };
        
        // Load local image file
        $scope.fileSelected = function(fileInputField) {
            delete $scope.adForEditing.imageDataUrl;
            var file = fileInputField.files[0];
            
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.adForEditing.imageDataUrl = reader.result;
                    $("#image-edit").html("<img src='" + reader.result + "'>");
                };
                
                reader.readAsDataURL(file);
            } else {
                $("#image-edit").html("<p>File type not supported!</p>");
            }
        }; 
        
        $scope.editAdClicked = function() {
            var accessToken = userSession.getAccessToken();
            
            if ($scope.deleteImage) {
                delete $scope.adForEditing.imageDataUrl;
            };
            
            delete $scope.adForEditing.categoryName;
            delete $scope.adForEditing.townName;
            delete $scope.adForEditing.id;

            adsData.editAd($scope.adId, $scope.adForEditing, accessToken).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $location.path('/user-ads');
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                }
            );
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
        $scope.viewChangedToEditAd = function() {
            $rootScope.$broadcast('viewNameChanged', EDIT_AD_VIEW_NAME);
        };
        
        $scope.successOccurred = function(message) {
            $rootScope.$broadcast('operationSuccess', message);
        };
        
        $scope.errorOccurred = function(message) {
            $rootScope.$broadcast('operationFailure', message);
        };
        
        $scope.viewChangedToEditAd();
        $scope.loadAdForEdit();
    }
]);
