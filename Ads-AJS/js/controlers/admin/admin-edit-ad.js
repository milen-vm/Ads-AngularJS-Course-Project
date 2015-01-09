'use strict';

app.controller('AdminEditAd', ['$scope', '$rootScope', '$location', 'adminAds', 'userSession',
        'adIdTransfer', 'categoriesData', 'townsData', 'constValue',
    function($scope, $rootScope, $location, adminAds, userSession, adIdTransfer, categoriesData,
            townsData, constValue) {
        
        var viewName = constValue.editAdViewName;
        $scope.adId = 637;//adIdTransfer.id;
        adIdTransfer.id = null;       
        $scope.isAdmin = userSession.isAdmin();
        $scope.statusArray = ['Published', 'WaitingApproval', 'Inactive', 'Rejected'];
        $scope.adForEditing = {};
        $scope.categories = [];
        $scope.towns = [];

        $scope.loadAdForEdit = function() {            
            if ($scope.adId) {                
                adminAds.getAdById($scope.adId).then(
                function(data) {                    
                    $scope.adForEditing = data;
                    $scope.adDate = new Date(data.date)                                
                },
                function(error) {
                    $scope.errorOccurred(error.message);
                });              
            } else {
                $scope.errorOccurred('Ad for editing is not selected.');
            };           
        };
        
        $scope.cancelEditCliced = function() {
            $location.path('/');
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
