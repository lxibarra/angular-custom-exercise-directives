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
      restrict: 'E',
      replace:true,
      transclude:true,
      template:'<form></form>',
      link:function(scope, element, attrs, ctrl, transclude) {
        var compiled = $compile(element.append(bFormElements(scope[attrs.model], attrs.name).children()))(scope);
        element.append(compiled);

        transclude(function(clone) {
          element.append(clone);
        });


      }
    };
  });
