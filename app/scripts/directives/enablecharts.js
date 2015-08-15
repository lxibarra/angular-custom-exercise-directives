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
      scope: {
        mappings:'=mappings'
      },
      link: function (scope, element, attrs, ctrl) {
        var modalHolder = attrs.modalHolder || 'body';
        //compile forms and put them at the body for later use.
        $(modalHolder).append(formGenerator('bar', scope));
        $(modalHolder).append(formGenerator('pie', scope));
        $(modalHolder).append(formGenerator('line', scope));

        //create an array of the variables we have to update on the scope.

        var listeners = Object.keys(scope.mappings);

        //generate context menu for handsome table and add event listener for option selected
        var ContextMenu = forSignatures.getContextMenu(this, listeners, function (option, listener) {
          //listener will be updated each time the modal is opened
          scope.listener = listener;

          var formData = cellReader(ctrl.Hansometable);
          var jquery_maps = formMapper(formData.export, option);

          Object.keys(jquery_maps).forEach(function(prop) {
                $(prop).val(jquery_maps[prop]);
                $(prop).trigger('input');
          });


          $('[data-type=' + option + ']').modal();
          //we could regenerate the forms here in order to make data dynamic currently only 3 data sets are possible


        });



        ctrl.Handsometable.destroy();
        ctrl.Hansometable = new Handsontable(ctrl.DOMElement, ctrl.conf);
        ctrl.Hansometable.updateSettings(ContextMenu);
      }
      ,
      controller: function ($scope) {
        $scope.submit = function (model) {

          $scope.mappings[this.listener]['data'] = forSignatures.getChart(model);
          console.log($scope.mappings[this.listener]);
        };
      }

    }
  });


