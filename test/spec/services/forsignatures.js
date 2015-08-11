'use strict';

describe('Service: forSignatures', function () {

  // load the service's module
  beforeEach(module('angularExamApp'));

  // instantiate service
  var forSignatures;
  beforeEach(inject(function (_forSignatures_) {
    forSignatures = _forSignatures_;
  }));

  it('should do something', function () {
    expect(!!forSignatures).toBe(true);
  });

});
