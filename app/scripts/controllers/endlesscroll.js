'use strict';

/**
 * @ngdoc function
 * @name angularExamApp.controller:EndlesscrollCtrl
 * @description
 * # EndlesscrollCtrl
 * Controller of the angularExamApp
 */
angular.module('angularExamApp')
  .controller('EndlesscrollCtrl', function (imageProvider, $scope) {

      $scope.data = [];
      //we pre inject service dependencies
      imageProvider.set(['imgur']);

      var promise = imageProvider.get('imgur', undefined, undefined, 1, 50);
      promise.then(function(data) {
          $scope.$apply(function() {
            $scope.data = data;
          });
      });

  });
