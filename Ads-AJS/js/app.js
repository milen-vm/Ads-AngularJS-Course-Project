'use strict';

var app = angular.module('adsApp', ['ngRoute', 'ui.bootstrap', 'ui.bootstrap.tpls']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/ads-list.html',
        controller: 'AdsList'
    });
    
    $routeProvider.when('/registration-form', {
        templateUrl: 'templates/registration-form.html',
        controller: 'RegistrationForm'
    });
    
    $routeProvider.otherwise({
        redirectTo: '/'
    });
});

app.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs,control) {
            var checker = function () {
 
                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel);
 
                //get the value of the other password 
                var e2 = scope.$eval(attrs.passwordMatch);
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {
 
                //set the form control to valid if both
                //passwords are the same, else invalid
                control.$setValidity("unique", n);
            });
        }
    };
}]);
