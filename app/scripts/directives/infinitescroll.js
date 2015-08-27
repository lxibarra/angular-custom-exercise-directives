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
        var page = 1, scrollPromise = false, scrollPromiseUp = false, sequencePage = 0;
        var resultLimit = parseInt(attrs.limit || 12);
        var preloadPriorat = 1;//Math.round(resultLimit / 2);
        var whitespace = 0, elementsSpace;
        var enablePrevFetch = false;

        imageProvider.set(imageSources);

        element.append('<div/>');

        //more refactored way of working
        function drawDomImages(data, page, inverse) {
          var thumbnails = angular.element('<div/>');
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
          // clear.attr('data-limit', limit);
          clear.attr('data-sequence', ++sequencePage);
          clear.css({'clear': 'both'});

          thumbnails.append(clear);

          if (inverse) {
            element.children().eq(0).after(thumbnails.children());
          } else {
            element.append(thumbnails.children());
          }

          elementsSpace = elementsSpace || element.height();
          angular.element(attrs.indicator).hide();
        }


        function getImages(source, channel, queryString, page, limit, inverse) {
          var promise = imageProvider.get(source, channel, queryString, page, limit, inverse);
          promise.then(function (data) {
            drawDomImages(data, page, inverse);
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
            if (scrollPromise === false) {
              scrollPromise = true;
              var promise = new Promise(function (resolve, reject) {
                resolve(getNextResultSet());

              });

              promise.then(function () {
                scrollPromise = false;
              })
            }
          } else {

            if (element.children().eq(preloadPriorat).visible(true) && scrollPromiseUp === false) {

              //we get the first one
              //im not at the top
              if (windowEl.scrollTop() >= 600) { //ideal would be to calculate based on thumbnail height
                scrollPromiseUp = true;
                console.log('fired removal of bottom ones');
                var separator = angular.element('.content-divider').eq(0);
                var page1 = parseInt(separator.attr('data-page')) - 1;
                page1 = page1 <= 0 ? 1 : page1;
                console.log(page1);
                var promiseUp = imageProvider.get(imageSources[0], attrs.channel, undefined, page1, resultLimit, true);
                promiseUp.then(function (data) {
                  drawDomImages(data, page1, true);
                  var newHeight = element.children().eq(0).height() - elementsSpace;
                  newHeight = newHeight < 0 ? 0 : newHeight;
                  element.children().eq(0).css({width: "100%", height: newHeight + 'px'});

                  var length = element.children().length;

                  element.children().slice(length - resultLimit - 1, length).remove();
                  scrollPromiseUp = false;
                });
              }
            }

          }
        });

      }
    };
  });

