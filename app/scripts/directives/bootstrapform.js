'use strict';

/**
 * @ngdoc directive
 * @name angularExamApp.directive:bootstrapForm
 * @description
 * # bootstrapForm
 */
angular.module('bootstrapForms', [])
  .directive('bootstrapForms', function (bFormElements, $injector) {
    return {
      template: '<form novalidate></form>',
      restrict: 'E',
      replace:true,
      compile: function compile(element, attrs) {
        var value1 = $injector.get(attrs.formModel);

        element.append(bFormElements(value1, attrs.name||'form'));


      }
    };
  });
