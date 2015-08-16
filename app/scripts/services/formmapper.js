'use strict';

/**
 * @ngdoc service
 * @name angularExamApp.formMapper
 * @description
 * # formMapper
 * Service in the angularExamApp.
 */
angular.module('highcharts')
  .service('formMapper', function () {
    // This service will map form input names to data properties but no actual DOM manipulation is done here
    return function (data, option) {
      var mapper = {};

        mapper['[name="xAxis.categories"]'] = data.xAxis;
        mapper['[name="chart.type"]'] = option;
        data.series.forEach(function(item, index) {
          mapper['[name="Series.name"]:eq(' + index + ')'] = item.name;
          mapper['[name="Series.data"]:eq(' + index + ')'] = item.data.join(',');
        });


      return mapper;
    };
  });
