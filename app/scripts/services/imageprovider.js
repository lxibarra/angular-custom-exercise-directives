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
          getArray: function (data) {
            return data.data.data;
          },
          fields: {
            id: 'id',
            title: 'title',
            width: 'width',
            height: 'height',
            is_album: 'is_group',
            link: 'url',
            type: 'mime'
          },
          pagingSupported: function (url) {
            var supported = true;
            var unsupported = [
              'gallery/hot/viral',
             // 'gallery/top/viral'
            ];

            for (var i = 0, top = unsupported.length; i < top; i++) {
              if (url.match(unsupported[i])) {
                supported = false;
                break;
              }
            }

            return supported;
          }
        }
      };

    function getBounds(arrlength, page, perPage) {
      var upperBound, lowerBound;
      if (typeof perPage === 'number' && typeof page === 'number') {
        if (page <= 1) {
          lowerBound = 0;
        } else {
          lowerBound = perPage * page;
        }

        if (lowerBound > arrlength) {
          lowerBound = arrlength;
        }

        upperBound = lowerBound + perPage;

        if (upperBound > arrlength) {
          upperBound = arrlength;
        }
      } else {
        lowerBound = 0;
        upperBound = arrlength;
      }

      return {
        lowerBound: lowerBound,
        upperBound: upperBound
      }
    }

    function mapFields(_objectMap, arr) {
      var fields = Object.keys(_objectMap);
      var newOne = [];
      for(var r = 0, top = arr.length; r<top; r++) {
        var obj = {};
        for(var p = 0, ftop = fields.length; p<ftop; p++) {
          obj[_objectMap[fields[p]]] = arr[r][fields[p]];
        }
        newOne.push(obj);
      }
      return newOne;
    }

    function mapObject(data, serviceName, page, perPage) {
      var collection = providerMaps[serviceName].getArray(data),
          result = [];
      if (collection.length === 0) {
        return result;
      } else {
        if (providerMaps[serviceName].pagingSupported(data.config.url) === true) {
          result = mapFields(providerMaps[serviceName].fields, collection);
        } else {
          var pager = getBounds(collection.length, page, perPage);
          //console.log(collection.slice(pager.lowerBound, pager.upperBound));
          result = mapFields(providerMaps[serviceName].fields, collection.slice(pager.lowerBound, pager.upperBound));
        }

        return result;
      }
    }

    //pre injection of services will allow the app to work faster
    function injectDependencies(dependencies) {
      dependencies.forEach(function (d) {
        providers[d] = $injector.get(d);
      });
    }

    function getImages(service, path, queryString, page, perPage) {

      if(typeof providers[service] === ' undefined') {
        providers[service] = $injector.get(service);
      }

      var promise = new Promise(function(resolve, reject) {
          providers[service].get(path, queryString, page, perPage).then(function (data) {
            resolve(mapObject(data, service, page, perPage));
          }, function() {
            reject('Unable to fetch data');
          });
      });

      return promise;
    }

    return {
      set: injectDependencies,
      get: getImages
    }

  });
