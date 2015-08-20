'use strict';

/**
 * @ngdoc function
 * @name angularExamApp.controller:NotesCtrl
 * @description
 * # NotesCtrl
 * Controller of the angularExamApp
 *
 * For this controller to work you need to configure the mongolab api key in app/scripts/services/mongoapikey.js
 * just make sure you dont track changes in git
 * you can use: git update-index --assume-unchanged app/scripts/services/mongoapikey.js
 *
 */
angular.module('angularExamApp')
  .controller('NotesCtrl', function ($scope, mongolab) {

    function bModal(action) {
      if (action !== 'hide') {
        angular.element('#newNoteModal').modal();
      } else {
        angular.element('#newNoteModal').modal('hide');
      }
    }

    $scope.cancelModal = function () {
      bModal('hide');
      if (typeof $scope.currentNote._id !== 'undefined') {
        $scope.dbrecords.splice($scope.dbrecords.indexOf($scope.currentNote), 1, $scope.currentClone);
      }

    };

    $scope.bgworking = true;

    var rows = mongolab.getNotes();
    rows.then(function (data) {
      $scope.bgworking = false;
      $scope.dbrecords = data;
    });

    $scope.addnote = function () {
      $scope.currentNote = {};
      $scope.modalTitle = "New Note";
      bModal();
    };

    $scope.openEdit = function (note) {
      $scope.currentNote = note;
      $scope.currentClone = angular.copy(note);
      $scope.modalTitle = "Edit Note";
      bModal();
    };

    $scope.deleteNote = function (note) {
      $scope.bgworking = true;
      note.recordId = note._id.$oid;
      note.$delete(function () {
        $scope.bgworking = false;
        $scope.dbrecords.splice($scope.dbrecords.indexOf(note), 1);
      });
    };

    $scope.save = function () {
      $scope.bgworking = true;
      if ($scope.currentNote._id) {

        mongolab.saveNote($scope.currentNote).then(function () {
          angular.element('#newNoteModal').modal('hide');
          $scope.currentNote.LastModified = {"$date": new Date().toISOString()};
          $scope.currentNote.$save(function () {
            $scope.bgworking = false;
          });
        }, function () {
          $scope.bgworking = false;
        });
      } else {

        var record = mongolab.New();
        record.title = $scope.currentNote.title;
        record.note = $scope.currentNote.note;
        record.LastModified = {"$date": new Date().toISOString()};
        record.CreatedAt = {"$date": new Date().toISOString()};

        record.$save(function (item) {
          $scope.bgworking = false;
          bModal('hide');
          $scope.dbrecords.push(item);
        });
      }
    }
  });
