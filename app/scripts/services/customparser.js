'use strict';

/**
 * @ngdoc service
 * @name angularExamApp.CustomParser
 * @description
 * # CustomParser
 * Service in the angularExamApp.
 */
angular.module('ngcSpreadSheet')
  .service('customParser', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var regex = {
      numbers: /^\d+$/,
      boolean: /^(true|false)$/i
    };

    return function (value) {
      if (value.match(regex.numbers)) {
        return parseInt(value);
      }
      if (value.match(regex.boolean)) {
        return Boolean(value);
      }

      return value;
    };
  });
