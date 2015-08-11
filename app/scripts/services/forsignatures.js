'use strict';

/**
 * @ngdoc service
 * @name angularExamApp.forSignatures
 * @description
 * # forSignatures
 * Service in the angularExamApp.
 */
angular.module('highcharts')
  .service('forSignatures', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return function(chart) {
      if(chart === 'bar' || chart === 'column') {
        return  {
          chart: {
            type: 'bar|column'
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: ['category a', 'category b', 'category c']
          },
          yAxis: {
            title: {
              text: ''
            }
          },
          series: [{
            name: 'series 1',
            data: [1, 0, 4]
          }, {
            name: 'series 2',
            data: [5, 7, 3]
          }]
        }
      }
    }
  });
