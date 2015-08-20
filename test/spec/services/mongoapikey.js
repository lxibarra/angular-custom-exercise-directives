'use strict';

describe('Service: mongoApiKey', function () {

  // load the service's module
  beforeEach(module('angularExamApp'));

  // instantiate service
  var mongoApiKey;
  beforeEach(inject(function (_mongoApiKey_) {
    mongoApiKey = _mongoApiKey_;
  }));

  it('should do something', function () {
    expect(!!mongoApiKey).toBe(true);
  });

});
