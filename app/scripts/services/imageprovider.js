'use strict';

/**
 * @ngdoc service
 * @name angularExamApp.imageProvider
 * @description
 * # imageProvider
 * Service in the angularExamApp.
 */
angular.module('angularExamApp')
  .service('imageProvider', function ($injector) {
    var providers = {},
      /**
       * Ideally all maps implement the same fields
       * @type {{imgur: {property: {data: string}, fields: *[]}}}
       */
        providerMaps = {
            imgur: {
              getArray: function(data) {
                return data.data;
              },
              fields:[
                { id:'id' },
                { title:'title' },
                { width:'width' },
                { height:'height' },
                { is_group:'is_album' },
                { url:'link' },
                { mime:'type' }
              ]
            }

        };

    function mapObject(data, serviceName) {
      // i was debuggin this line

      var collection = providerMaps[serviceName].getArray(data);
      console.log(collection);
      /*console.log(data);
      console.log(data.data[providerMaps[serviceName]]);
      var collection = data[providerMaps[serviceName].property];
      console.log(collection);*/

    }

    function injectDependencies(dependencies) {
      dependencies.forEach(function (d) {
        providers[d] = $injector.get(d);
      });
    }

    function getImages(path, queryString, page, perPage) {

      Object.keys(providers).forEach(function(p) {
        providers[p].promise = providers[p].get();

        providers[p].promise.then(function(data) {
          mapObject(data, p);
        });
      });


    }

    return {
      set:injectDependencies,
      get:getImages
    }

  });
