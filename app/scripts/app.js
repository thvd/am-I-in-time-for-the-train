'use strict';

angular.module('amIInTimeForTheTrainApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/choose-station', {
        templateUrl: 'views/choose-station.html',
        controller: 'ChooseStationCtrl'
      })
      .otherwise({
        redirectTo: '/choose-station'
      });
  });
