'use strict';

/**
 * @ngdoc directive
 * @name angularExamApp.directive:barchart
 * @description
 * # barchart
 * use attribute chart-data to pass in highcharts.com configuration
 */
angular.module('highcharts', [])
  .directive('highchart', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      scope:{
        chartData:'=chartData'
      },
      link: function postLink(scope, element, attrs) {
        element.highcharts(scope.chartData);

        scope.$watch('chartData', function() {
          element.highcharts(scope.chartData);
        });
      }
    };
  });
