'use strict';
var caca;
/**
 * @ngdoc function
 * @name angularExamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularExamApp
 */
angular.module('angularExamApp')
  .controller('MainCtrl', function ($scope) {

    //this object is necessary in order to map (to data) the chart directives correctly
    $scope.Mycharts = {
      chartplaceholder1:{},
      chartplaceholder2:{},
      chartplaceholder3:{}
    };


  });
