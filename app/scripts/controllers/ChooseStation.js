/* global google: false */
'use strict';

angular.module('amIInTimeForTheTrainApp')
  .controller('ChooseStationCtrl', function ($scope, GeoService, $log, GoogleMapsService) {

    /**
     * @type {google.maps.LatLng}
     */
    var currentLocation;

    $scope.transportTypeOptions = [
      {
        name: 'Alle',
        value: ['train_station', 'subway_station', 'bus_station']
      },
      {
        name: 'Trein',
        value: ['train_station']
      },
      {
        name: 'Metro',
        value: ['subway_station']
      },
      {
        name: 'Bus',
        value: ['bus_station']
      }
    ];

    $scope.chosenTransportType = $scope.transportTypeOptions[0];

    /**
     * @type {Position}
     */
    $scope.location = null;

    $scope.isWatchLocationEnabled = GeoService.isWatchLocationEnabled();

    /**
     * @type {Position}
     */
    $scope.currentPosition = null;

    $scope.nearbyStations = [];

    $scope.chosenStation = null;

    /**
     * @type {google.maps.DistanceMatrixResponseRow}
     */
    $scope.distance = null;

    $scope.matchTypeOfTransport = function (station) {
      var match = false;
      angular.forEach($scope.chosenTransportType.value, function (transportType) {
        if (station.types[0] === transportType) {
          match = true;
        }
      });
      return match;
    };

    $scope.onClickStation = function (station) {
      $scope.chosenStation = station;

      GeoService.stopWatchLocation();
      GeoService.startWatchLocation({
        maximumAge: 100000,
        timeout: 10000,
        enableHighAccuracy: true
      });

      $scope.isWatchLocationEnabled = GeoService.isWatchLocationEnabled();

      $scope.calculateDistanceToStation(currentLocation);
    };

    $scope.$on('onLocationChanged', function onLocationChanged(event, position) {

      $scope.currentPosition = position;

      if ($scope.chosenStation !== null) {
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        $scope.calculateDistanceToStation(latLng);
      }
    });


    /**
     * @param {google.maps.LatLng} originLocation
     */
    $scope.calculateDistanceToStation = function calculateDistanceToStation(originLocation) {
      var destinationStation = $scope.chosenStation;
      // Calculate distance
      GoogleMapsService.getDistanceMatrix({
        origins: [originLocation],
        destinations: [destinationStation.geometry.location],
        travelMode: google.maps.TravelMode.WALKING,
        avoidHighways: false,
        avoidTolls: false
      }).then(function onSuccess(result, status) {
          var TAG = '[GoogleMapsService.GoogleMapsService.getDistanceMatrix().onSuccess()]';
          $log.info(TAG, status, result);

          $scope.distance = result.rows[0].elements[0];

        }, function onError(result, status) {
          var TAG = '[GoogleMapsService.GoogleMapsService.getDistanceMatrix().onError()]';
          $log.error(TAG, status, result);
        });
    };


    GeoService.getCurrentLocation().then(function onSuccess(location) {

      var TAG = TAG + '[GeoService.getCurrentLocation.onSuccess()]';

      $log.info(TAG, 'Success event:', location);

      $scope.location = location;

      var coords = location.coords;
      currentLocation = new google.maps.LatLng(coords.latitude, coords.longitude);
      var chosenStationType = $scope.chosenTransportType;

      $log.info(TAG, 'chosenStationType:', chosenStationType, currentLocation);

      GoogleMapsService.nearbySearch({
        location: currentLocation,
        types: chosenStationType.value,
        rankBy: google.maps.places.RankBy.DISTANCE
      }).then(function onSuccess(results) {

          var TAG = '[GoogleMapsService.radarSearch.onSuccess()]';

          $log.info(TAG, 'Onsuccess event:', results);

          $scope.nearbyStations = results;

        }, function onError(results, status) {
          var TAG = TAG + '[GoogleMapsService.radarSearch.onError()]';
          $log.error(TAG, status, results);
        });

    }, function onError(error) {
      var TAG = TAG + '[GeoService.getCurrentLocation.onError()]';
      $log.error(TAG, error, arguments);
    }, {
      maximumAge: 100000,
      timeout: 10000,
      enableHighAccuracy: true
    });

  });
