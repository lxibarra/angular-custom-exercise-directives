'use strict';

describe('Controller: EndlesscrollCtrl', function () {

  // load the controller's module
  beforeEach(module('angularExamApp'));

  var EndlesscrollCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EndlesscrollCtrl = $controller('EndlesscrollCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EndlesscrollCtrl.awesomeThings.length).toBe(3);
  });
});
