'use strict';

app.controller('UserProfileEdit', ['$scope', '$rootScope', 'userData', 'townsData',
    function($scope, $rootScope, userData, townsData) {
        var EDIT_USER_PROFILE_VIEW_NAME = 'Edit User Profile';
        $scope.userData = {};
        $scope.towns = {};
        
        $scope.loadUserData = function() {
            userData.getUser().then(
                function(data) {
                    $scope.userData = data;
                    console.log(data);
                },
                function(error) {
                    console.log(error);
                });
        };        
        
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
        $scope.viewChangedToEditUserProfile = function() {
            $rootScope.$broadcast('viewNameChanged', EDIT_USER_PROFILE_VIEW_NAME);
        };
        
        $scope.viewChangedToEditUserProfile();
        $scope.loadUserData();
    }
]);
