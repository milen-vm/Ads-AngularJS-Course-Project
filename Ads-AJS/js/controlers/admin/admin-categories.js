'use strict';

app.controller('AdminCategories', ['$scope', '$rootScope', 'adminCategories',
    function($scope, $rootScope, adminCategories) {
        adminCategories.get('Id', 1, 10).then(
            function(data) {
                console.log(data);
                $scope.categories = data.categories;
            },
            function(error) {
                console.log(error);
            }
        );
        // Event
        $scope.viewNameChanged = function() {           
            $rootScope.$broadcast('viewNameChanged', 'Categories');
        };
        
        $scope.viewNameChanged();
    }
]);
