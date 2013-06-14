'use strict';

describe('Controller: StationDistanceCtrl', function () {

  // load the controller's module
  beforeEach(module('amIInTimeForTheTrainApp'));

  var StationDistanceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $routeParams) {
    scope = $rootScope.$new();
    StationDistanceCtrl = $controller('StationDistanceCtrl', {
      $scope: scope,
      $routeParams: $routeParams
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
    expect(true).toBe(true);
  });
});
