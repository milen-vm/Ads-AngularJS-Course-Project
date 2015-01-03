'use strict';

var app = angular.module('adsApp', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ui.bootstrap.tpls']);

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
        controller: 'LoginForm'
    });
    
    $routeProvider.when('/publish-new-ad', {
        templateUrl: 'templates/publish-new-ad.html',
        controller: 'PublishNewAd'
    });
    
    $routeProvider.otherwise({
        redirectTo: '/'
    });
});
