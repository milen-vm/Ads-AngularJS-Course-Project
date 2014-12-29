'use strict';

var app = angular.module('adsApp', ['ngRoute', 'ui.bootstrap', 'ui.bootstrap.tpls']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/ads-list.html',
        controller: 'AdsList'
    });
});


