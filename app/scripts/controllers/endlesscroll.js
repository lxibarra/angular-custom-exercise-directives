'use strict';

/**
 * @ngdoc function
 * @name angularExamApp.controller:EndlesscrollCtrl
 * @description
 * # EndlesscrollCtrl
 * Controller of the angularExamApp
 */
angular.module('angularExamApp')
  .controller('EndlesscrollCtrl', function (imageProvider) {

      //we pre inject service dependencies
      imageProvider.set(['imgur']);

      var promise = imageProvider.get('imgur', undefined, undefined, 1, 10);
      promise.then(function(data) {
          //we can manipulate dom now
        console.log(data);
      });

  });
