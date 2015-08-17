'use strict';

/**
 * @ngdoc service
 * @name angularExamApp.bootstrapFormElements
 * @description
 * # bootstrapFormElements
 * Service in the angularExamApp.
 */
angular.module('bootstrapForms')
  .service('bFormElements', function () {

    var _date = Date;
    var _context = this;

    /**
     * Data types
     * @description
     * Creates all available formn types
     */
    this.String = function(field, formName) {
      var div = angular.element('<div/>').addClass('form-group');
      var label = angular.element('<label/>').html(field.label).attr('for', field.model);
      var input = angular.element('<input/>').attr('type', 'text').addClass('form-control').attr('name', field.model).attr('ng-model', field.model);
      div.append(label);
      div.append(input);
      if(field.required) {
          _context.addRequired(div, field, formName);
      }


      return div;
    };

    /**
     * Validation markup generation
     */

    this.addRequired = function(div, field, formName) {
      div.find('input').attr('required', 'required');
      var required = angular.element('<span/>')
        .addClass('help-block')
        .attr('ng-show', formName + '.' + field.model + '.$error.required')
        .html(field.requiredMessage||'This field is required');

      div.append(required);
    };

    /*function String() {
      console.log('String');
    }*/


    function Date() {
       return new _date();
    }

    function Number() {
      return 55;
    }

    function Button() {
      return 'button';
    }

    function createElements(form, formName) {

      var elements = [];
      form.forEach(function(elem) {
         elements.push(_context[elem.type](elem, formName));
      });

      return elements;
    }

    return function(form, formName) {
      return createElements(form, formName);
    }
  });
