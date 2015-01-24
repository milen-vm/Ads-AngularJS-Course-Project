'use strict';

var app = angular.module('adsApp', ['ngRoute', 'ngResource', 'ngCookies', 'ui.bootstrap']);

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
        
        $routeProvider.when('/admin-users-list', {
            templateUrl: 'templates/admin/admin-users-list.html',
            controller: 'AdminUsersList'
        });
        
        $routeProvider.when('/admin-user-edit', {
            templateUrl: 'templates/admin/admin-user-edit.html',
            controller: 'AdminUserEdit'
        });
        
        $routeProvider.when('/admin-categories-list', {
            templateUrl: 'templates/admin/admin-categories-list.html',
            controller: 'AdminCategories'
        });
        
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }
]);

app.constant('constValue', {
    baseUrl: 'http://softuni-ads.azurewebsites.net/api/',   // localhost:1337   softuni-ads.azurewebsites.net
    editAdViewName: 'Edit Ad',
    itemsPerPage: 10,
    pagerMaxSize: 5
});
