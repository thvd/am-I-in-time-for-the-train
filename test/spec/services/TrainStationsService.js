'use strict';

describe('Service: TrainStationsService', function () {

  // load the service's module
  beforeEach(module('amIInTimeForTheTrainApp'));

  // instantiate service
  var TrainStationsService;
  beforeEach(inject(function (_TrainStationsService_) {
    TrainStationsService = _TrainStationsService_;
  }));

  it('should do something', function () {
    expect(!!TrainStationsService).toBe(true);
  });

});
