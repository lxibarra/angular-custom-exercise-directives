'use strict';

/**
 * @ngdoc service
 * @name angularExamApp.imgur
 * @description
 * # imgur
 * Service of imgurApi.
 * All functions and path definitions are unique to imgur nothing dependent of other API's should be here.
 */
angular.module('angularExamApp').
  value('imgurApi', 'https://api.imgur.com/3/').
  value('apiAuthorization', window.devValues.imgur.clientId || 'your_client_id')
  .service('imgur', function ($http, imgurApi, apiAuthorization) {
    //https://api.imgur.com/endpoints/gallery

    /**
     * To help us remove extra ? in the url
     * @type {RegExp}
     */
    var qString = /(\?)(?=.*\1)/g;

    var defaults = {
      path: 'gallery/hot/viral'
    };

    function createUrl(path, queryString, page, perPage) {
      var finalPath = typeof path ==='undefined'? defaults.path : path
        ,q;


      if(typeof queryString === 'object') {
        Object.keys(queryString).forEach(function(p) {
            q = q||'?';
            q = q.length === 1?  q + p + '=' + queryString[p] : q + '&' + p + '=' + queryString[p];
        })
      }

      if(typeof page !== 'undefined') {
        q = q||'?';
        q = q.length === 1? q + 'page=' + page : q + '&page=' + page;
      }

      if(typeof perPage !== 'undefined') {
        q = q||'?';
        q = q.length === 1? q + 'perPage=' + perPage : q + '&perPage=' + perPage;
      }

      var url = finalPath + (q||'');

      //Remove extra ? and return url
      return imgurApi + url.split('').reverse().join('').replace(qString, '').split('').reverse().join('');

    }

    function requestObject(url, clientId) {
      return {
        method: 'GET',
        url:url,
        headers:{
          'Authorization': 'Client-ID ' + clientId
        }
      };
    }

    function fetchImages(path, queryString, page, perPage) {
      var url = createUrl(path, queryString, page, perPage);
      return $http(requestObject(url, apiAuthorization));
    }

    return {
      get:fetchImages
    }


  });
