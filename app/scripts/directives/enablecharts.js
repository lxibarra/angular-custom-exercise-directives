'use strict';

/**
 * @ngdoc directive
 * @name angularExamApp.directive:enableCharts
 * @description
 * # enableCharts
 */
angular.module('highcharts')
  .directive('enableCharts', function(formGenerator) {
    return {
      restrict:'A',
      require:'^spreadSheet',
      link:function(scope, element, attrs, ctrl) {
        scope.id = attrs.id + '_conf';
        element.parent().append('<div id="' + scope.id +'" class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title" id="myModalLabel">Modal title</h4> </div> <div class="modal-body"> ... </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> <button type="button" class="btn btn-primary">Save changes</button> </div> </div> </div> </div>');

        var listeners = attrs.enableCharts.split(',');

        console.log(formGenerator('bar'));

        function setData(option) {

          if(option === 'bar') {

            jQuery('#' + scope.id).modal();

            //update up to controller scope
            scope.$apply(function() {
              scope.export = 'naaa';
            });

          }

          //console.log(arguments);
          scope.data.barExport = {};
          var coords = this.getSelected();
          scope.data.barExport.coords = {};
          scope.data.barExport.coords.beginRow = coords[0];
          scope.data.barExport.coords.beginCol = coords[1];
          scope.data.barExport.coords.endRow = coords[2];
          scope.data.barExport.coords.endCol = coords[3];

          scope.data.barExport.data = this.getData(
            coords[0],
            coords[1],
            coords[2],
            coords[3]);
          //console.log(scope.data.barExport);

        }

        function createSubOps(option) {
          var subOps = [];
          listeners.forEach(function(i){
            subOps.push(
              {
                name:i,
                callback:function() {
                  setData.call(this, option);
                }
              }
            );
          });

          return subOps
        }



        var ChartMenu = {
          contextMenu:  {

            items: {
              'add_chart':{
                name:'Add Chart',
                submenu:[
                  {
                    name:'bar',
                    submenu:createSubOps('bar')
                  },
                  {
                    name:'Pie',
                    submenu:createSubOps('Pie')
                  },
                  {
                    name:'Line',
                    submenu:createSubOps('Line')
                  }
                ]
              },
              'hsep1':'---------',
              row_above:{},
              row_below:{},
              remove_row: {},
              col_left: {},
              col_right:{},
              alignment: {}
            }
          }

        };

        ctrl.Handsometable.destroy();
        ctrl.conf.data = scope.data;
        ctrl.Hansometable = new Handsontable(ctrl.DOMElement, ctrl.conf);
        ctrl.Hansometable.updateSettings(ChartMenu);
      }
    }
  });
