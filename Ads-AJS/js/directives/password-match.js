app.directive('passwordMatch', [function () {   // http://rogeralsing.com/2013/08/26/angularjs-directive-to-check-that-passwords-match-followup/
    return {
        restrict: 'A',
        scope: true,
        require: 'ngModel',
        link: function (scope, elem , attrs, control) {
            var checker = function () {
 
                //get the value of the first password
                var firstPassword = scope.$eval(attrs.ngModel);
 
                //get the value of the other password 
                var secondPassword = scope.$eval(attrs.passwordMatch);
                return firstPassword == secondPassword;
            };
            
            scope.$watch(checker, function (n) {
 
                //set the form control to valid if both
                //passwords are the same, else invalid
                control.$setValidity('passwordmatch', n);
            });
        }
    };
}]);