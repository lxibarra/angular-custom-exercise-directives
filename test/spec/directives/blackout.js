'use strict';

describe('Directive: blackout', function () {

  // load the directive's module
  beforeEach(module('angularExamApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<blackout></blackout>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the blackout directive');
  }));
});
