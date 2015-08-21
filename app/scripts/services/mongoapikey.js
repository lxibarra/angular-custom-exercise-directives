'use strict';

/**
 * @ngdoc service
 * @name angularExamApp.mongoApiKey
 * @description
 * # mongoApiKey
 * Value in the angularExamApp.
 */
angular.module('angularExamApp')
  .value('mongoApiKey', window.devValues.mongoApiKey||'please_input_your_api_key');
