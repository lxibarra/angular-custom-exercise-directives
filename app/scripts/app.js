'use strict';

/**
 * @ngdoc overview
 * @name angularExamApp
 * @description
 * # angularExamApp
 *
 * Main module of the application.
 */
angular
  .module('angularExamApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngcSpreadSheet',
    'highcharts',
    'formGeneration'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/blackout', {
        templateUrl: 'views/blackout.html',
        controller: 'BlackoutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
