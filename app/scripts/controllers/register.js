'use strict';

/**
 * @ngdoc function
 * @name angularExamApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the angularExamApp
 */
angular.module('angularExamApp')
  .controller('RegisterCtrl', function ($scope) {

    $scope.save = function (form) {
      console.log(form);
    };

    $scope.dataSource = [
      {
        label: 'Name:',
        model: 'name',
        type: 'String',
        htmlType: 'text',
        placeholder: 'type here...',
        validation: [
          {
            required: {
              required: true,
              errorMessage: 'Name is mandatory'
            }
          }
        ]
      },
      {
        label:'Email:',
        model:'email',
        type:'String',
        htmlType:'text',
        placeholder:'your business or personal email',
        validation:[
          {
            required:{
              required:true,
              errorMessage:'Please provide a valid email'
            }
          },
          {
            regex: {
              expression:'email',
              errorMessage:'Invalid email format'
            }
          }

        ]
      },
      {
        label: 'Age:',
        model: 'age',
        type: 'Number',
        htmlType: 'number',
        placeholder: 'Type age here',
        validation: [
          {
            required: {
              required: true,
              errorMessage: 'Please provide your age'
            }
          },
          {

            range: {
              min: 10,
              max: 60,
              errorMessage: {
                min: 'No children under 10 allowed',
                max: 'No Seniors allowed, possible hart attack'
              }
            }
          }
        ]
      },
      {
        label:'sign up date:',
        model:'signUpDate',
        type:'Date',
        placeholder:'type age here',
        errorMessage:'Invalid date value',
        validation:[
          {
            required:{
              required:true,
              errorMessage:'Please provide a signup date'
            }
          }
        ]
      }


    ];


    $scope.showMessage = function () {
      console.log($scope.name);
    }
  });
