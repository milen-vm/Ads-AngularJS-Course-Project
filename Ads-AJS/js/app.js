'use strict';

var app = angular.module('adsApp', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ui.bootstrap.tpls']);

app.config(['$routeProvider',
    function($routeProvider) {
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
        
        $routeProvider.when('/user-ads', {
            templateUrl: 'templates/user-ads.html',
            controller: 'UserAds'
        });
        
        $routeProvider.when('/edit-ad', {
            templateUrl: 'templates/edit-ad.html',
            controller: 'EditAd'
        });
        
        $routeProvider.when('/user-profile-edit', {
            templateUrl: 'templates/user-profile-edit.html',
            controller: 'UserProfileEdit'
        });
        
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }
]);

app.constant('constValue', {
    baseUrl: 'http://softuni-ads.azurewebsites.net/api/'
});
