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
    'formGeneration',
    'bootstrapForms'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
