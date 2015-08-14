'use strict';

describe('Service: cellReader', function () {

  // load the service's module
  beforeEach(module('angularExamApp'));

  // instantiate service
  var cellReader;
  beforeEach(inject(function (_cellReader_) {
    cellReader = _cellReader_;
  }));

  it('should do something', function () {
    expect(!!cellReader).toBe(true);
  });

});
