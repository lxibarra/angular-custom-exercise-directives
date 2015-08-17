'use strict';

describe('Service: bootstrapFormElements', function () {

  // load the service's module
  beforeEach(module('angularExamApp'));

  // instantiate service
  var bootstrapFormElements;
  beforeEach(inject(function (_bootstrapFormElements_) {
    bootstrapFormElements = _bootstrapFormElements_;
  }));

  it('should do something', function () {
    expect(!!bootstrapFormElements).toBe(true);
  });

});
