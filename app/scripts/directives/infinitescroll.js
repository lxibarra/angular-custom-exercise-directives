'use strict';

/**
 * @ngdoc directive
 * @name angularExamApp.directive:infiniteScroll
 * @description
 * # infiniteScroll
 */
angular.module('angularExamApp')
  .directive('infiniteScroll', function () {
    return {
      restrict: 'E',
      template:'<div></div>',
      replace:true,
      scope:{
        images:'=images'
      },
      link: function postLink(scope, element, attrs) {
        element.on('mousemove', function(evt) {
          if(evt.target.className === 'scroller-thumbnail') {
            var percentageX = Math.round((evt.offsetX / evt.target.clientWidth) * 100);
            var percentageY =  Math.round((evt.offsetY / evt.target.clientHeight) * 100);
            evt.target.style.backgroundPosition = percentageX + "% " + percentageY + "%";
          }
        });

        element.on('mouseout', function(evt) {
          if (evt.target.className === 'scroller-thumbnail') {
            evt.target.style.backgroundPosition = "50% 50%";
          }
        });

        element.on('click', function(evt) {


          //console.log(evt.target.attributes['data-url'].nodeValue);

          if (evt.target.className === 'scroller-thumbnail') {

            if(evt.target.parentElement.className.toString().match(/full/)) {
              evt.target.parentElement.className = evt.target.parentElement.className.toString().replace(/full/, '');
              evt.target.style.backgroundImage = evt.target.attributes['data-url'].nodeValue;
            } else {
              evt.target.parentElement.className += " full";
              evt.target.style.backgroundImage = '';
            }
          } else if (evt.target.tagName === 'IMG') {
            evt.target.parentElement.parentElement.className = evt.target.parentElement.parentElement.className.toString().replace(/full/, '');
            evt.target.parentElement.style.backgroundImage = evt.target.parentElement.attributes['data-url'].nodeValue;
          }
        });

        scope.$watch('images', function() {
          scope.images.forEach(function(img) {
            var col = angular.element('<div/>');
            col.addClass('col-xs-6 col-md-4 mario');
            var item = angular.element('<div/>');
            item.attr('data-url', "url('" + img.url + "')");
            item.addClass('scroller-thumbnail');
            item.attr('style', "background: url('" + img.url + "') center no-repeat;");
            var image = angular.element('<img/>');
            image.attr('src', img.url);
            item.append(image);
            col.append(item);
            element.append(col);
          });
        });
      }
    };
  });

