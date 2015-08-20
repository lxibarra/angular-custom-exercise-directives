'use strict';

/**
 * @ngdoc service
 * @name angularExamApp.mongolab
 * @description
 * # mongolab
 * Service in the angularExamApp.
 */
angular.module('angularExamApp').factory('Notes', function ($resource, mongoApiKey) {
    return $resource('https://api.mongolab.com/api/1/databases/mynotesapp/collections/notes?apiKey=' + mongoApiKey);
}).service('mongolab', function (Notes) {
  // AngularJS will instantiate a singleton by calling "new" on this function

  function getAll() {
    return Notes.query().$promise;
  }

  return {
    getNotes: getAll
  };
});
