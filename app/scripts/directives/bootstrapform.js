'use strict';

/**
 * @ngdoc directive
 * @name angularExamApp.directive:bootstrapForm
 * @description
 * # bootstrapForm
 */
angular.module('bootstrapForms', [])
  .directive('bootstrapForms', function (bFormElements, $compile) {
    return {
      restrict: 'A',
      replace:true,
      transclude:true,
      link:function(scope, element, attrs) {
        console.log(scope[attrs.model]);
        element.append($compile(bFormElements(scope[attrs.model], attrs.name||'form'))(scope));
      }
    };
  });
