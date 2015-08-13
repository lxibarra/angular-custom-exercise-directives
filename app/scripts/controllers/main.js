'use strict';

/**
 * @ngdoc function
 * @name angularExamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularExamApp
 */
angular.module('angularExamApp')
  .controller('MainCtrl', function ($scope) {
    $scope.testing = [
      { year:2010, amount:10 },
      { year:2011, amount: 15 },
      { year:2012, amount: 30 }
    ];


    $scope.hello = {
      message:'Hello'
    }

    $scope.SayHello = function(value) {
      $scope.hello = value;
    }

    $scope.print = function() {
      console.log($scope.barchart);
    }
    //$scope.barchart = {};

    $scope.barchart = {
      data: {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Title'
        },
        xAxis: {
          categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
          title: {
            text: 'Fruit eaten'
          }
        },
        series: [{
          name: 'Jane',
          data: [1, 0, 4]
        }, {
          name: 'John',
          data: [5, 7, 3]
        }]
      }
    };



    $scope.crackit = function() {
      $scope.barchart = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'New title'
        },
        xAxis: {
          categories: ['Cars', 'airplanes', 'skate boards']
        },
        yAxis: {
          title: {
            text: 'rides'
          }
        },
        series: [{
          name: 'Jane',
          data: [10, 20, 30]
        }, {
          name: 'John',
          data: [12, 2, 1]
        }]
      };
    }

  });
