'use strict';

/**
 * @ngdoc service
 * @name angularExamApp.cellReader
 * @description
 * # cellReader
 * Service in the angularExamApp.
 */
angular.module('highcharts')
  .service('cellReader', function () {
    return function (spreadSheet) {
      var coords = spreadSheet.getSelected(), exported = {};
      exported.beginRow = coords[0];
      exported.beginCol = coords[1];
      exported.endRow = coords[2];
      exported.endCol = coords[3];

      exported.data = spreadSheet.getData(
        coords[0],
        coords[1],
        coords[2],
        coords[3]);
      exported.xAxis = [];



      exported.data.forEach(function(row) {
        if(row[0]!= '') {
          exported.xAxis.push(row[0]);
        }
      });

      exported.xAxis = exported.xAxis.join(',');
      exported.series = [];

      exported.data[0].forEach(function(column) {
        if(typeof column !== 'undefined' || column.length > 0) {
          exported.series.push({ name:column, data:[] });
        }
      });

      exported.data.forEach(function(row, i) {
          if(i > 0) {
            var column = 1;
            while (column <= row.length) {
              if(row[column]) {
                exported.series[column - 1].data.push(row[column]);
              }
              column++;
            }
          }
      });


      return {
        export:exported
      };
    }
  })
;
