'use strict';

describe('Controller: BlackoutCtrl', function () {

  // load the controller's module
  beforeEach(module('angularExamApp'));

  var BlackoutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BlackoutCtrl = $controller('BlackoutCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BlackoutCtrl.awesomeThings.length).toBe(3);
  });
});
