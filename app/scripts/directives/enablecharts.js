'use strict';

/**
 * @ngdoc directive
 * @name angularExamApp.directive:enableCharts
 * @description
 * # enableCharts
 */
angular.module('highcharts')
  .directive('enableCharts', function(formGenerator, forSignatures) {
    return {
      restrict:'A',
      require:'^spreadSheet',
      link:function(scope, element, attrs, ctrl) {

        //compile forms and put them at the body for later use.
        element.parent().append(formGenerator('bar', scope));
        element.parent().append(formGenerator('pie', scope));
        element.parent().append(formGenerator('line', scope));

        //create an array of the variables we have to update on the scope.
        var listeners = attrs.enableCharts.split(',');

        //generate context menu for handsome table and add event listener for option selected
        var ContextMenu = forSignatures.getContextMenu(this, listeners, function(option, listener) {
            //listener will be updated each time the modal is opened
            scope.listener = listener;
            $('[data-type=' + option + ']').modal();
        });

        ctrl.Handsometable.destroy();
        ctrl.conf.data = scope.data;
        ctrl.Hansometable = new Handsontable(ctrl.DOMElement, ctrl.conf);
        ctrl.Hansometable.updateSettings(ContextMenu);
      },
      controller:function($scope) {
        $scope.submit = function(model) {
          $scope[this.listener] = forSignatures.getChart(model);

        };
      }
    }
  });


/*
 //current function that gets slected data from spreadseeht buts its really dirty
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
 var coords = ctrl.Hansometable.getSelected();
 scope.data.barExport.coords = {};
 scope.data.barExport.coords.beginRow = coords[0];
 scope.data.barExport.coords.beginCol = coords[1];
 scope.data.barExport.coords.endRow = coords[2];
 scope.data.barExport.coords.endCol = coords[3];

 scope.data.barExport.data = ctrl.Hansometable.getData(
 coords[0],
 coords[1],
 coords[2],
 coords[3]);
 console.log(scope.data.barExport);

 }
 */
