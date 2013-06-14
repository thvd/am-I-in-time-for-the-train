'use strict';

describe('Controller: ChooseStationCtrl', function () {

  // load the controller's module
  beforeEach(module('amIInTimeForTheTrainApp'));

  var ChooseStationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $resource) {
    scope = $rootScope.$new();
    ChooseStationCtrl = $controller('ChooseStationCtrl', {
      $scope: scope,
      ngResource: $resource
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });
});
