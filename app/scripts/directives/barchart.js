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
      transclude:true,
      link: function postLink(scope, element, attrs) {

          //scope.chartData = scope.chartData||{};

          element.highcharts(scope.chartData.data);

          scope.$watch('chartData.data', function () {
            element.highcharts(scope.chartData.data);
          });

      }
    };
  });
