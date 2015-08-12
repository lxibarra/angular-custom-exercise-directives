'use strict';

describe('Directive: enableCharts', function () {

  // load the directive's module
  beforeEach(module('angularExamApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<enable-charts></enable-charts>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the enableCharts directive');
  }));
});
