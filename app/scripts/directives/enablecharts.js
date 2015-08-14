'use strict';

/**
 * @ngdoc directive
 * @name angularExamApp.directive:enableCharts
 * @description
 * # enableCharts
 */
angular.module('highcharts')
  .directive('enableCharts', function (formGenerator, forSignatures, cellReader, formMapper) {
    return {
      restrict: 'E',
      require: '^spreadSheet',
      link: function (scope, element, attrs, ctrl) {
        var modalHolder = attrs.modalHolder || 'body';
        //compile forms and put them at the body for later use.
        $(modalHolder).append(formGenerator('bar', scope));
        $(modalHolder).append(formGenerator('pie', scope));
        $(modalHolder).append(formGenerator('line', scope));

        //create an array of the variables we have to update on the scope.

        var listeners = attrs.mappings.split(',');

        //generate context menu for handsome table and add event listener for option selected
        var ContextMenu = forSignatures.getContextMenu(this, listeners, function (option, listener) {
          //listener will be updated each time the modal is opened
          scope.listener = listener;
          var formData = cellReader(ctrl.Hansometable);
          console.log(formData);
          var jquery_maps = formMapper(formData.export, option);

          Object.keys(jquery_maps).forEach(function(prop) {
                $(prop).val(jquery_maps[prop]);
                $(prop).trigger('input');
          });


          $('[data-type=' + option + ']').modal();
          //we could regenerate the forms here in order to make data dynamic currently only 3 data sets are possible


          //we have to get data from handsontable parseit and sendit to the form depending on the type of chart

          //we also have to create a way to watch for changes on the spreadsheet
        });

        ctrl.Handsometable.destroy();
        ctrl.Hansometable = new Handsontable(ctrl.DOMElement, ctrl.conf);
        ctrl.Hansometable.updateSettings(ContextMenu);
      }
      ,
      controller: function ($scope) {
        $scope.submit = function (model) {
          $scope[this.listener]['data'] = forSignatures.getChart(model);
        };
      }

    }
  })
;


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
