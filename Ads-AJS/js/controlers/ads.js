'use strict';

app.controller('AdsList', ['$scope', '$rootScope', '$location', '$anchorScroll', 'userAds', 'adminAds', 'userSession', 'dataTransfer',
    function($scope, $rootScope, $location, $anchorScroll, userAds, adminAds, userSession, dataTransfer) {
        var ADS_PER_PAGE = 10,
            PAGER_MAX_SIZE = 5,
            USER_VIEW_NAME = 'Home',
            ADMIN_VIEW_NAME = 'Ads';
            
        $scope.isAdmin = false;
        $scope.adsParams = {
            categoryId: '',
            townId: ''        
        };
        $scope.adsStatus = '';       
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
                getAdminAds(categoryId, townId);                
            } else {
                getUserAds(categoryId, townId);
            };    
            
            $location.hash('top-navbar');
            $anchorScroll();   
        };
               
        function getUserAds(categoryId, townId) {
            userAds.getAds(categoryId, townId, $scope.adsPerPage, $scope.currentPage).then(
                function(data) {
                    $scope.adsList = data;
                    $scope.totalAds = $scope.adsList.numItems;
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                });
        }
        
        // Admin things
        function getAdminAds(categoryId, townId) {
            adminAds.getAdminAds($scope.adsStatus, categoryId, townId, $scope.adsPerPage, $scope.currentPage).then(
                function(data) {
                    $scope.adsList = data;
                    $scope.totalAds = $scope.adsList.numItems;
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                });
        }
        
        $scope.adminEditAdClicked = function(id) {
            dataTransfer.data = id;
            $location.path('/edit-ad');
        };
        
        $scope.adminRejectAdClicked = function(id) {
            adminAds.rejectAd(id).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $scope.loadAds();
                },
                function(error) {
                    $scope.errorOccurred(error.message);                   
                }
            );
        };
        
        $scope.adminApproveAdClicked = function(id) {
            adminAds.approveAd(id).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $scope.loadAds();
                },
                function(error) {
                    $scope.errorOccurred(error.message);                   
                }
            );
        };
        
        $scope.adminDeleteAdClicked = function(ad) {
            $scope.adForDeleting = ad;
        };
        
        $scope.adminDeleteAdConfirmed = function(id) {
            adminAds.deleteAd(id).then(
                function(data) {
                    $scope.successOccurred(data.message);
                    $scope.loadAds();
                },
                function(error) {
                    $scope.errorOccurred(error.message);                   
                }
            );
        };
        
        // Event
        $scope.viewNameChanged = function() {
            var viewName = $scope.isAdmin ? ADMIN_VIEW_NAME : USER_VIEW_NAME;
            
            $rootScope.$broadcast('viewNameChanged', viewName);
        };
        
        $scope.successOccurred = function(message) {
            $rootScope.$broadcast('operationSuccess', message);
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
         
        $scope.$on('adsStatusChanged', function(ev, status) {
            $scope.adsStatus = status;
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
