'use strict';

/**
 * @ngdoc service
 * @name angularExamApp.bootstrapFormElements
 * @description
 * # bootstrapFormElements
 * Generates a boostrap form along with validation, currently supported fields are:
 *
 *  -String
 *  -Number
 *  -Date
 *
 *  Example:
 *  HTML
 *  <form bootstrap-forms novalidate name="myForm" model="dataSource"></form>
 *
 *  pass the dataSource from the controller $scope as follows:
 *
 *   $scope.dataSource = [
     {
        label: 'Name:',
        model: 'name',                                scope variable name
        type: 'String',                               String|Date|Number
        htmlType: 'text',                             Any HTML5 element type
        placeholder: 'type here...',                  optional
        errorMessage:'My error on invalid type'       Only triggerable by Date and Number
        validation: [                                 Array of custom validator, only described items are avaliable
        {
            required: {
              required: true,
              errorMessage: 'Name is mandatory'
            },
            regex:{
              expression:/literalRegex/ or 'email'|'number',
              errorMessage:'your custom error message'
            },
            range: {
              min: 10,
              max: 60,
              errorMessage: {
                min: 'No numbers under 10 allowed',
                max: 'No numbers over 60 allowed'
              }
            }
        }
      ]
    },
    {
        ...other field definition
    },
    {
        ..as many as you want
    }
 */
angular.module('bootstrapForms')
  .service('bFormElements', function () {

    var _date = Date;
    var customExpressions = {
      number: /^(-)?\d+(\.\d+)?$/,
      email: /^\S+@\S+\.\S+$/
    };

    var _context = this;

    /**
     * Data types
     * @description
     * Creates all available formn types
     */
    this.String = function (field, formName) {
      var div = angular.element('<div/>').addClass('form-group');
      var ngForm = angular.element('<ng-form name="' + field.model + 'FieldForm"/>');
      var label = angular.element('<label/>').html(field.label).attr('for', field.model);
      var input = angular.element('<input/>')
        .attr('type', field.htmlType || 'text')
        .addClass('form-control')
        .attr('name', field.model)
        .attr('ng-model', field.model)
        .attr('placeholder', field.placeholder || '');

      ngForm.append(label);
      ngForm.append(input);
      if (field.validation) {
        field.validation.forEach(function (rule) {
          if (typeof _context[Object.keys(rule)[0]] !== 'undefined') {
            _context[Object.keys(rule)[0]](rule, ngForm, field);
          }
        });
      }
      div.append(ngForm);
      return div;
    };

    this.Date = function (field, formName) {
      field.htmlType = field.htmlType || 'date';
      var dateElement = _context.String(field, formName);
      _context.errorSpan(dateElement.find('ng-form'), field.errorMessage || 'Invalid date', field.model, 'date');
      return dateElement;
    };

    this.Number = function (field, formName) {
      field.htmlType = field.htmlType || 'number';
      var numberElement = _context.String(field, formName);
      _context.errorSpan(numberElement.find('ng-form'), field.errorMessage || 'Invalid number', field.model, 'number');
      return numberElement;
    };

    /**
     * Validation markup generation
     */

    this.required = function (rule, ngForm, field) {
      if (rule.required.required) {
        ngForm.find('input').attr('required', '');
        var errorMessage = rule.required.errorMessage || 'Field ' + field.model + ' is required';
        _context.errorSpan(ngForm, errorMessage, field.model, 'required');
      }
    };

    this.regex = function (rule, ngForm, field) {
      var _regExpression = typeof rule.regex.expression === 'string' ?
        customExpressions[rule.regex.expression].toString().replace('/', '').replace('/', '') :
        rule.regex.expression.toString().replace('/', '').replace('/', '');

      ngForm.find('input').attr('pattern', _regExpression);
      var errorMessage = rule.regex.errorMessage || 'Field ' + field.model + ' has an invalid pattern.';
      _context.errorSpan(ngForm, errorMessage, field.model, 'pattern');
    };

    this.range = function (rule, ngForm, field) {
      if (typeof rule.range.min !== 'undefined' && rule.range.min.toString().match(customExpressions.number)) {
        ngForm.find('input').attr('min', rule.range.min);

        var errorMessage = typeof rule.range.errorMessage === 'string' ? rule.range.errorMessage :
          ( typeof rule.range.errorMessage.min === 'string' ? rule.range.errorMessage.min : 'Number cannot be lower than ' + rule.range.min  );

        _context.errorSpan(ngForm, errorMessage, field.model, 'min');
      }

      if (typeof rule.range.max !== 'undefined' && rule.range.max.toString().match(customExpressions.number)) {
        ngForm.find('input').attr('max', rule.range.max);

        var errorMessage = typeof rule.range.errorMessage === 'string' ? rule.range.errorMessage :
          ( typeof rule.range.errorMessage.max === 'string' ? rule.range.errorMessage.max : 'Number cannot be lower than ' + rule.range.max  );

        _context.errorSpan(ngForm, errorMessage, field.model, 'max');
      }
    };

    this.errorSpan = function (ngForm, errorMessage, model, errorType) {
      var errorSpan = angular.element('<span/>')
        .addClass('help-block')
        .attr('ng-show', model + 'FieldForm.' + model + '.$error.' + errorType)
        .html(errorMessage || 'Field ' + model + ' Error');
      ngForm.append(errorSpan);
    };

    function createElements(form, attrs) {
      var elements = angular.element('<form/>');
      form.forEach(function (elem) {
        elements.append(_context[elem.type](elem));
      });

      return elements;
    }

    return function (form, formName) {
      return createElements(form, formName);
    }
  });
