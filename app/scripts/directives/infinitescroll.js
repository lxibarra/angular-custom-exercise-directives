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
        var page = 1;
        imageProvider.set(imageSources);


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
            clear.attr('data-page', page);
            clear.attr('data-limit', limit);
            clear.css({'clear': 'both'});

            thumbnails.append(clear);

            if (inverse) {
              element.prepend(thumbnails.children());
            } else {
              element.append(thumbnails.children());
            }


            angular.element(attrs.indicator).hide();
          });
        }

        angular.element(attrs.indicator).show();
        getImages(imageSources[0], attrs.channel, undefined, page, 9); //nine should be a limit set from outside

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

        windowEl.on('scroll', function () {
          //  console.log(windowEl.scrollTop());
          //is going down and reached the end
          if (windowEl.scrollTop() == (documentEl.height() - windowEl.height())) {
            if (page > 16) {
              page = 1;
            } else {
              page++;
            }

            //aqui me quede
            var clone = element.clone();

            if (element.children().length > 10) {
              var clone = element.clone();
              console.log(clone.height());
              // var clear = angular.element('<div/>');
              // clear.css({'clear':'both'});
              // clone.append(clear);
              var whitespace = element.height() / 2;
              // console.log(element.height(), clone.height());
              //clone.children().slice(0,10).remove();

              var dummyDiv = angular.element('<div/>');
              console.log(whitespace);
              dummyDiv.css({width: "100%"});
              dummyDiv.css({height: whitespace + 'px'});
              dummyDiv.attr('data-fetch', '1,10');
              element.children().slice(0, 9).remove();
              element.prepend(dummyDiv);
            }


            /*
             var dummyDiv = angular.element('<div/>');
             dummyDiv.css({width:"100%"});
             dummyDiv.css({height:(documentEl.height() - windowEl.height()) + 'px'});

             if(element.children().length > 9) {
             console.log(dummyDiv.css('height'), windowEl.scrollTop(), windowEl.height());
             element.children().remove();
             element.append(dummyDiv);
             }
             */
            //dummyDiv.style.height = documentEl.height();

            //we can call slice on children just as a regular array to remove elements.
            //$('parentSelector').children().slice(0, n).remove();
            //console.log(element.children().length);

            angular.element(attrs.indicator).show();
            getImages(imageSources[0], attrs.channel, undefined, page, 9);

          } else if (windowEl.scrollTop() === 0) { //going up and reached the top

          }
        });
      }
    };
  });

