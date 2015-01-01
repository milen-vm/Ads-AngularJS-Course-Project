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
    
    $routeProvider.when('/login-form', {
        templateUrl: 'templates/login-form.html',
        controller: 'loginForm'
    });
    
    $routeProvider.otherwise({
        redirectTo: '/'
    });
});
