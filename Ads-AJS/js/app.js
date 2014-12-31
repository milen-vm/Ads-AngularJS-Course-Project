'use strict';

var app = angular.module('adsApp', ['ngRoute', 'ui.bootstrap', 'ui.bootstrap.tpls']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/ads-list.html',
        controller: 'AdsList'
    });
    
    $routeProvider.when('/registration-form', {
        templateUrl: 'templates/registration-form.html',
        controller: 'AdsList'   // must add another controller
    });
    
    $routeProvider.otherwise({
        redirectTo: '/'
    });
});


