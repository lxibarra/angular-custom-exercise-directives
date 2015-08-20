'use strict';

/**
 * @ngdoc function
 * @name angularExamApp.controller:NotesCtrl
 * @description
 * # NotesCtrl
 * Controller of the angularExamApp
 */
angular.module('angularExamApp')
  .controller('NotesCtrl', function ($scope, mongolab) {


    var rows = mongolab.getNotes();
    rows.then(function(data) {
      console.log(data);
      $scope.dbrecords = data;
    })
  });
