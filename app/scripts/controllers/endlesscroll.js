'use strict';

/**
 * @ngdoc function
 * @name angularExamApp.controller:EndlesscrollCtrl
 * @description
 * # EndlesscrollCtrl
 * Controller of the angularExamApp
 */
angular.module('angularExamApp')
  .controller('EndlesscrollCtrl', function (imageProvider, $scope, $window, $document) {

      var windowEl = angular.element($window);
      var documentEl = angular.element($document);
      var page = 1;

      $scope.data = [];
      //we pre inject service dependencies
      imageProvider.set(['imgur']);

      angular.element('#indicator').show();
      var promise = imageProvider.get('imgur', 'gallery/hot/viral', undefined, page, 9);
      promise.then(function(data) {
          $scope.$apply(function() {
            $scope.data = data;
            angular.element('#indicator').hide();
          });
      });

      windowEl.on('scroll', function() {

          if(windowEl.scrollTop() == (documentEl.height() - windowEl.height())) {
            if(page > 16) {
              page = 1;
            } else {
              page++;
            }

            angular.element('#indicator').show();
            var promise = imageProvider.get('imgur', 'gallery/hot/viral', undefined, page, 9);
            promise.then(function(data) {
              $scope.$apply(function() {
                $scope.data = data;
                angular.element('#indicator').hide();
              });
            });
          }
      });

  });
