'use strict';

angular.module('amIInTimeForTheTrainApp', ['ngResource', 'pascalprecht.translate'])
  .config(function ($routeProvider, $translateProvider) {
    $routeProvider
      .when('/choose-station', {
        templateUrl: 'views/choose-station.html',
        controller: 'ChooseStationCtrl'
      })
      .when('/station-distance/:stationReference', {
        templateUrl: 'views/station-distance.html',
        controller: 'StationDistanceCtrl'
      })
      .otherwise({
        redirectTo: '/choose-station'
      });


    $translateProvider.translations({

    });
  });
