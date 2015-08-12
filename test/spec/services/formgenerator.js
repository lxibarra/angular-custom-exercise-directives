'use strict';

describe('Service: formGenerator', function () {

  // load the service's module
  beforeEach(module('angularExamApp'));

  // instantiate service
  var formGenerator;
  beforeEach(inject(function (_formGenerator_) {
    formGenerator = _formGenerator_;
  }));

  it('should do something', function () {
    expect(!!formGenerator).toBe(true);
  });

});
