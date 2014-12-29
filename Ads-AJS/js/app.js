'use strict';

var app = angular.module('adsApp', ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/ads-list.html'
    });
});
