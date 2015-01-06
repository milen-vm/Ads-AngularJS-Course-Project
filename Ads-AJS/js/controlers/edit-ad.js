'use strict';

app.controller('EditAd', ['$scope', '$rootScope', 'adIdTransfer', 'userSession', 'adsData', 'townsData', 'categoriesData',
    function($scope, $rootScope, adIdTransfer, userSession, adsData, townsData, categoriesData) {
        var EDIT_AD_VIEW_NAME = 'Edit Ad';
        
        $scope.adId = 637; //adIdTransfer.id;
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
                    console.log(data);
                    $scope.adForEditing = data;                                     
                },
                function(error) {
                    console.log(error);
                });
            } else {
                console.log('ad id is missing');
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
            console.log($scope.adForEditing);
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
        
        // Event
        $scope.viewChangedToEditAd = function() {
            $rootScope.$broadcast('viewNameChanged', EDIT_AD_VIEW_NAME);
        };
        
        $scope.viewChangedToEditAd();
        $scope.loadAdForEdit();
    }
]);
