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

    function _generateContextMenu(excel, listeners, setData) {
      function createSubOps(option) {
        var subOps = [];
        listeners.forEach(function (i) {
          subOps.push(
            {
              name: i,
              callback: function () {
                setData.call(excel, option, i);
              }
            }
          );
        });

        return subOps;
      }

      var ChartMenu = {
        contextMenu: {

          items: {
            'add_chart': {
              name: 'Add Chart',
              submenu: [
                {
                  name: 'Bar',
                  submenu: createSubOps('bar')
                },
                {
                  name: 'Pie',
                  submenu: createSubOps('pie')
                },
                {
                  name: 'Line',
                  submenu: createSubOps('line')
                }
              ]
            },
            'hsep1': '---------',
            row_above: {},
            row_below: {},
            remove_row: {},
            col_left: {},
            col_right: {},
            alignment: {}
          }
        }

      };

      return ChartMenu;
    }

    var chartParsers = {
      bar: function (model) {
        var blueprint = {
          chart: {
            type: model.chart.type
          },
          title: {
            text: model.title.text
          },
          xAxis: {
            categories: model.xAxis.categories.split(',')
          },
          yAxis: {
            title: {
              text: model.yAxis.title.text
            }
          },
          series: (function (info) {
            var arr = [];
            for (var c = 1; c <= 3; c++) {
              if (typeof info['name' + c] !== 'undefined' && info['name' + c].length > 0 && typeof info['data' + c] !== 'undefined' && info['data' + c].length > 0) {
                arr.push({name: info['name' + c], data: info['data' + c].split(',').map(function(x) { return parseFloat(x); })});
              }
            }
            return arr;
          })(model.Series)
        };

        return blueprint;
      },
      column:function(model) {
        return this.bar(model);
      }
    };


    return {
      getContextMenu: _generateContextMenu,
      getChart: function (model) {
        //same blueprint (bar) works for all.
        return chartParsers['bar'](model);
      }
    }
  });
