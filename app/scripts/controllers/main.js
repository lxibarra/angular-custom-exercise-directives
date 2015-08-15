'use strict';
var caca;
/**
 * @ngdoc function
 * @name angularExamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularExamApp
 */
angular.module('angularExamApp')
  .controller('MainCtrl', function ($scope) {

    $scope.chartplaceholder1 = {
      // data:{}
    };
    $scope.chartplaceholder2 = {
      // data:{}
    };
    $scope.chartplaceholder3 = {
      // data:{}
    };

    $scope.update1 = function () {
      $scope.chartplaceholder1 = {
        data: {
          chart: {
            type: 'bar'
          },
          title: {
            text: 'first'
          },
          xAxis: {
            categories: ['Air', 'Bananas', 'none']
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
      }
    };

    $scope.update2 = function () {
      $scope.chartplaceholder2 = {
        data: {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Fruit Consumption'
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
      }
    }


    $scope.update3 = function () {
      $scope.chartplaceholder3 = {
        data: {
          chart: {
            type: 'line'
          },
          title: {
            text: 'Fruit Consumption'
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
      }
    }

  });
