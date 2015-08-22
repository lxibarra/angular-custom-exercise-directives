'use strict';

describe('Service: imgur', function () {

  // load the service's module
  beforeEach(module('angularExamApp'));

  // instantiate service
  var imgur;
  beforeEach(inject(function (_imgur_) {
    imgur = _imgur_;
  }));

  it('should do something', function () {
    expect(!!imgur).toBe(true);
  });

});
