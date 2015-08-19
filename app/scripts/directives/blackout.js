'use strict';

/**
 * @ngdoc directive
 * @name angularExamApp.directive:blackout
 * @description
 * # blackout
 */
angular.module('angularExamApp')
  .directive('blackout', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      replace:true,
      link: function postLink(scope, element, attrs) {
        if(attrs.type === 'hide') {
          var source = angular.element('#' + attrs.source);
          element.addClass('bl');
          element.html(source.html());
        } else if (attrs.type === 'remove') {
          var source = angular.element('#' + attrs.source).clone();
          angular.element('.blackout', source).each(function(index,el) {
            el = $(el);
            var len = el.html().length;
            el.html('');
            for(var c = 0; c<len; c++) {
              el.append('_ ');
            }
          });
          element.html(source);
        }
      }
    };
  });
