'use strict';

/**
 * @ngdoc service
 * @name angularExamApp.mongolab
 * @description
 * # mongolab
 * Service in the angularExamApp.
 */
angular.module('angularExamApp').factory('Notes', function ($resource, mongoApiKey) {
    return $resource('https://api.mongolab.com/api/1/databases/mynotesapp/collections/notes/:id?apiKey=' + mongoApiKey, {
      id:'@recordId'
    });
}).service('mongolab', function (Notes) {
  // AngularJS will instantiate a singleton by calling "new" on this function

  function getAll() {
    return Notes.query().$promise;
  }

  function save(record) {
    return Notes.save(record).$promise;
  }

  function newResource() {
    return new Notes();
  }
  return {
    getNotes: getAll,
    saveNote: save,
    New:newResource
  };
});
