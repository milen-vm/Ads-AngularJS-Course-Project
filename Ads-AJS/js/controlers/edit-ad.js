'use strict';

app.controller('EditAd', ['$scope', '$rootScope', '$location', 'adIdTransfer', 'userAds',
        'adminAds', 'userSession', 'townsData', 'categoriesData', 'constValue',
    function($scope, $rootScope, $location, adIdTransfer, userAds, adminAds,
            userSession, townsData, categoriesData, constValue) {
                
        var viewName = constValue.editAdViewName;       
        $scope.adId = adIdTransfer.id;
        adIdTransfer.id = null;
        $scope.deleteImage = false;
        $scope.statusArray = ['Published', 'WaitingApproval', 'Inactive', 'Rejected'];
        $scope.isAdmin = userSession.isAdmin();
        $scope.adForEditing = {};        
        $scope.categories = [];
        $scope.towns = [];
        
        $scope.loadAdForEdit = function() {            
            if ($scope.adId) {
                if ($scope.isAdmin) {
                    getAdminAd();
                } else {
                    getUserAd();
                };                                    
            } else {
                $scope.errorOccurred('Ad for editing is not selected.');
            };           
        };
        
        function getAdminAd() {
            adminAds.getAdById($scope.adId).then(
                function(data) {                    
                    $scope.adForEditing = data;
                    $scope.adForEditing.changeimage = false;
                    
                    var dateStr = data.date;                          // takes 2 hours back in firefox without "Z"
                    var lastChar = dateStr.charAt(dateStr.length - 1);
                    if (lastChar ==! 'Z' || lastChar ==! 'z') {
                        $scope.adDate = new Date(data.date + 'Z');
                    } else {
                        $scope.adDate = new Date(data.date); 
                    };
                                                   
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                });
        }
        
        function getUserAd() {
            userAds.getAdById($scope.adId).then(
                function(data) {
                    $scope.adForEditing = data;
                    $scope.adForEditing.changeimage = false;                                    
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                });
        }
        
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
        
        $scope.setAdNewDate = function(date) {
            if (date) {
                delete $scope.adForEditing.date;
                $scope.adForEditing.date = date.toISOString();  
            };            
        };
        
        $scope.editAdClicked = function() {            
            if ($scope.deleteImage) {
                delete $scope.adForEditing.imageDataUrl;
                $scope.adForEditing.changeimage = true;
            };
            
            if (!$scope.adForEditing.changeimage) {
                delete $scope.adForEditing.imageDataUrl;
            };
            
            delete $scope.adForEditing.categoryName;
            delete $scope.adForEditing.townName;
            delete $scope.adForEditing.id;
            
            if ($scope.isAdmin) {
                editAdminAd();
            } else {
                editUserAd();
            };          
        };
        
        function editAdminAd() {
            delete $scope.adForEditing.ownerUsername;
            delete $scope.adForEditing.ownerPhone;
            delete $scope.adForEditing.ownerName;
            delete $scope.adForEditing.ownerEmail;

            adminAds.editAd($scope.adForEditing, $scope.adId).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $location.path('/');
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                }
            );
        }
        
        function editUserAd() {
            delete $scope.adForEditing.date;
            
            userAds.editAd($scope.adId, $scope.adForEditing).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $location.path('/user-ads');
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                }
            );
        }
        
        $scope.cancelEditCliced = function() {
            if ($scope.isAdmin) {
                $location.path('/');
            } else {
                $location.path('/user-ads');
            };           
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
