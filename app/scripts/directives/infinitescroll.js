'use strict';

/**
 * @ngdoc directive
 * @name angularExamApp.directive:infiniteScroll
 * @description
 * # infiniteScroll
 */
angular.module('angularExamApp')
  .directive('infiniteScroll', function (imageProvider, $window, $document) {
    return {
      restrict: 'E',
      template: '<div></div>',
      replace: true,
      link: function postLink(scope, element, attrs) {
        var windowEl = angular.element($window);
        var documentEl = angular.element($document);
        var imageSources = attrs.imageSource.split(',');
        var page = 1, scrollPromise = false;
        var resultLimit = parseInt(attrs.limit||12);
        var preloadPriorat = 1;//Math.round(resultLimit / 2);
        var whitespace = 0, elementsSpace;
        var enablePrevFetch = false;

        imageProvider.set(imageSources);

        element.append('<div/>');

        function getImages(source, channel, queryString, page, limit, inverse) {
          var promise = imageProvider.get(source, channel, queryString, page, limit, inverse);
          var thumbnails = angular.element('<div/>');
          promise.then(function (data) {
            data.forEach(function (img) {
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
              thumbnails.append(col);
            });

            var clear = angular.element('<div/>');
            clear.addClass('content-divider');
            clear.attr('data-page', page);
            clear.attr('data-limit', limit);
            clear.css({'clear': 'both'});

            thumbnails.append(clear);

            if (inverse) {
              element.children().eq(0).after(thumbnails.children());
            } else {
              element.append(thumbnails.children());
            }

            elementsSpace = elementsSpace||element.height();
            angular.element(attrs.indicator).hide();
          });

          return promise;
        }

        angular.element(attrs.indicator).show();
        getImages(imageSources[0], attrs.channel, undefined, page, resultLimit); //nine should be a limit set from outside

        element.on('mousemove', function (evt) {
          if (evt.target.className === 'scroller-thumbnail') {
            var percentageX = Math.round((evt.offsetX / evt.target.clientWidth) * 100);
            var percentageY = Math.round((evt.offsetY / evt.target.clientHeight) * 100);
            evt.target.style.backgroundPosition = percentageX + "% " + percentageY + "%";
          }
        });

        element.on('mouseout', function (evt) {
          if (evt.target.className === 'scroller-thumbnail') {
            evt.target.style.backgroundPosition = "50% 50%";
          }
        });

        element.on('click', function (evt) {

          if (evt.target.className === 'scroller-thumbnail') {

            if (evt.target.parentElement.className.toString().match(/full/)) {
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

        function getNextResultSet() {
          if (page > 16) {
            page = 1;
          } else {
            page++;
          }
          //this Should only execute when going down
          if (element.children().length > resultLimit + 2) {
            whitespace = element.height() / 2;
            element.children().slice(1, resultLimit + 2).remove();
            element.children().eq(0).css({width: "100%", height: whitespace + 'px'});
          }
          angular.element(attrs.indicator).show();
          return getImages(imageSources[0], attrs.channel, undefined, page, resultLimit);
        }

        windowEl.on('scroll', function () {

          //is going down and reached the end
          if (windowEl.scrollTop() == (documentEl.height() - windowEl.height())) {
             if(scrollPromise === false) {
               scrollPromise = true;
               var promise = new Promise(function(resolve, reject) {
                  resolve(getNextResultSet());
               });

               promise.then(function(){
                 scrollPromise = false;
               })
             }
          } else { }//if (windowEl.scrollTop() !== 0) { //going up and reached the top
            //can also check if height is more than 0
         //   console.log(enablePrevFetch, preloadPriorat, element.children().eq(preloadPriorat).visible());

            /* //currently kind of working code
            console.log(enablePrevFetch, preloadPriorat, element.children().eq(preloadPriorat).visible(true));
             if (element.children().eq(preloadPriorat).visible(true) && enablePrevFetch) {
                 enablePrevFetch = false;
                console.log('Element ', preloadPriorat, ' is visible');

                if(page >1) {
                  page--;
                } else {
                  page = 16;
                }

               getImages(imageSources[0], attrs.channel, undefined, page, resultLimit, true);
               var newHeight = whitespace - elementsSpace;
               newHeight = newHeight < 0 ? 0 : newHeight;
               console.log(whitespace, newHeight, whitespace - newHeight);
               element.children().eq(0).css({ height:newHeight + "px"});
             } else if (element.children().eq(preloadPriorat).visible(true) === false) {
               enablePrevFetch = true;
             }
          }*/

          /*
          if($('.content-divider').visible()) {
            console.log($('.content-divider', element).eq(0).attr('data-page'), 'First Element is visible');
          }
          */

        });

      }
    };
  });

