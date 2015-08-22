'use strict';

describe('Service: imageProvider', function () {

  // load the service's module
  beforeEach(module('angularExamApp'));

  // instantiate service
  var imageProvider;
  beforeEach(inject(function (_imageProvider_) {
    imageProvider = _imageProvider_;
  }));

  it('should do something', function () {
    expect(!!imageProvider).toBe(true);
  });

});
