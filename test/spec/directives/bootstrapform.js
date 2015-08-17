'use strict';

describe('Directive: bootstrapForm', function () {

  // load the directive's module
  beforeEach(module('angularExamApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bootstrap-form></bootstrap-form>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bootstrapForm directive');
  }));
});
