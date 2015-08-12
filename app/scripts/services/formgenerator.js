'use strict';

/**
 * @ngdoc service
 * @name angularExamApp.formGenerator
 * @description
 * # formGenerator
 * Service in the angularExamApp.
 */
angular.module('formGeneration', [])
  .service('formGenerator', function (forSignatures) {
    //this can be feteched form a server using ajax
    var formElements = {
        subgroup: '<div class="container">\
                    <div class=col-xs-12> \
                    $content$\
                    </div></div>',
        text:  '<div class="form-group">\
                  <label for="$title$">$title</label>\
                  <input type="text" name="$title$" id="$title" class="form-control" placeholder="$value$">\
                </div>'
    };

    //check this is not working
    function prepare(value, _object, prop) {
      if(typeof value === 'string') {
          return formElements.text.replace('$title$', prop).replace('$value$', value);
      }

      if(value instanceof Array) {
        return formElements.text.replace('$title$', prop).replace('$value$', value.join(','));
      }

      if(typeof value === 'Object') {
          return formElements.subgroup.replace('$content$', prepare(_object[prop], _object, prop));
      }

    }

    return function(type) {
      var blueprint = forSignatures(type), Htmlform = [];
      var form = [];
      for (var p in blueprint) {
        form.push(prepare(blueprint[p], blueprint, p));
      }

      return form.join();
    }
  });
