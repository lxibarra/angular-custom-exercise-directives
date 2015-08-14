'use strict';

/**
 * @ngdoc directive
 * @name angularExamApp.directive:spreadsheet
 * @description
 * # spreadsheet
 * This directive has a dependency on handsontable avaliable at
 * http://handsontable.com/
 * bower install handsometable --save
 *
 * functionality, user should be able to select a range of data and then right click to bring up alt options, then
 * a selection of 3 types of grapsh will appear. After selection user should select labels and data range.
 */
angular.module('ngcSpreadSheet', [])
  .directive('spreadSheet', function (CustomParser) {

    return {
      restrict: 'E',
      template: '<div></div>',
      replace: true,
      transclude: true,
      scope: {
        data: '=data'
      },
      link: function postLink(scope, element, attrs, ctrl) {

        scope.conf = {};
        Object.keys(attrs.$attr).forEach(function (p) {
          scope.conf[p] = CustomParser(attrs[p]);
        });

        scope.conf.afterChange = function (change, source) {
          console.log(change, source);
          if (change) {
            try {
              var row = change[0][0],
                col = change[0][1],
                val = change[0][3];
              if (scope.data[row][col]) {
                scope.$apply(function () {
                  scope.data[row][col] = val;
                });
              }
            }
            catch (e) {

            }
          }
        };

        scope.conf.data = scope.data;
        ctrl.conf = scope.conf;
        ctrl.DOMElement = element[0];
        ctrl.Handsometable = new Handsontable(ctrl.DOMElement, scope.conf);


      },
      controller: function ($scope) {

      }

    };
  });
