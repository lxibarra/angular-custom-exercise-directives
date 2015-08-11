'use strict';

describe('Service: CustomParser', function () {

  // load the service's module
  beforeEach(module('angularExamApp'));

  // instantiate service
  var CustomParser;
  beforeEach(inject(function (_CustomParser_) {
    CustomParser = _CustomParser_;
  }));

  it('should do something', function () {
    expect(!!CustomParser).toBe(true);
  });

});
