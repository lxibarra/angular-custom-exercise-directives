'use strict';

/**
 * @ngdoc function
 * @name angularExamApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the angularExamApp
 */
angular.module('angularExamApp').value('Form1', [{
  label:'Name:',
  model:'name',
  type:'String',
  required:true
}])
  .controller('RegisterCtrl', function ($scope) {
    /*
    $scope.dataSource = [
        {
          label:'Name:',
          model:'name',
          type:'String',
          required:true
        },

        {
          label:'Date of birth:',
          model:'birth',
          type:'Date',
          required:true
        },
        {
          label:'Income:',
          model:'income',
          type:'Number',
          required:true
        },
        {
          label:'IRS Code',
          model:'irs',
          type:'String',
          format:/^[a-z]{3}\d{3}$/i
        },
        {
          label:'Save',
          type:'Button'
        }
      ];*/

      $scope.showMessage = function() {
        console.log($scope.name);
      }
  });
