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
      template: '<div style="min-width:100%; min-height:150px; border:dashed 2px #3c3c3c"></div>',
      restrict: 'E',
      scope:{
        chartData:'=chartData'
      },
      link: function postLink(scope, element, attrs) {
        //we can add here chartData.data. to remove it from the markup
          element.highcharts(scope.chartData.data);

          scope.$watch('chartData.data', function () {
            element.highcharts(scope.chartData.data);
          });

      }
    };
  });
