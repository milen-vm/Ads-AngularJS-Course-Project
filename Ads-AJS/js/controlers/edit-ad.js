'use strict';

app.controller('EditAd', ['$scope', '$rootScope', '$location', 'adIdTransfer', 'userAds',
        'adminAds', 'userSession', 'townsData', 'categoriesData', 'constValue',
    function($scope, $rootScope, $location, adIdTransfer, userAds, adminAds,
            userSession, townsData, categoriesData, constValue) {
                
        var viewName = constValue.editAdViewName;       
        $scope.adId = adIdTransfer.id;
        adIdTransfer.id = null;
        $scope.isAdmin = userSession.isAdmin();
        $scope.adForEditing = {};
        $scope.deleteImage = false;
        $scope.categories = {};
        $scope.towns = {};
        
        $scope.loadAdForEdit = function() {            
            if ($scope.adId) {           
                userAds.getAdById($scope.adId).then(
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
            if ($scope.deleteImage) {
                delete $scope.adForEditing.imageDataUrl;
                $scope.adForEditing.changeimage = true;
            };
            
            delete $scope.adForEditing.categoryName;
            delete $scope.adForEditing.townName;
            delete $scope.adForEditing.id;

            userAds.editAd($scope.adId, $scope.adForEditing).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $location.path('/user-ads');
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                }
            );
        };
        
        $scope.cancelEditCliced = function() {
            $location.path('/user-ads');
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
            $rootScope.$broadcast('viewNameChanged', viewName);
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
