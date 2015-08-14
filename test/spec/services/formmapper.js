'use strict';

describe('Service: formMapper', function () {

  // load the service's module
  beforeEach(module('angularExamApp'));

  // instantiate service
  var formMapper;
  beforeEach(inject(function (_formMapper_) {
    formMapper = _formMapper_;
  }));

  it('should do something', function () {
    expect(!!formMapper).toBe(true);
  });

});
