'use strict';

angular.module('amIInTimeForTheTrainApp')
  .controller('StationDistanceCtrl', function ($scope, $routeParams/*, GoogleMapsService*/) {
    var stationReference = $routeParams.stationReference;

    $scope.distance = 4000;
    $scope.stationReference = stationReference;
  });
