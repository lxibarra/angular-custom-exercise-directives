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
    $scope.data = [
      { year:2010, amount:10 },
      { year:2011, amount: 15 },
      { year:2012, amount: 30 }
    ];

    $scope.export = {};

    $scope.$watch('export', function(newVal) {
        console.log(newVal);
    });


    $scope.barchart = {
      chart: {
        type: 'column'
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

  });
