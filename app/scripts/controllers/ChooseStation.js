'use strict';

angular.module('amIInTimeForTheTrainApp')
    .controller('ChooseStationCtrl', function ($scope, GeoService, $log, GoogleMapsService) {

        var TAG = '[amIInTimeForTheTrainApp.ChooseStationCtrl]';

        $scope.transportTypeOptions = [{
            name: 'Alle',
            value: ['train_station', 'subway_station', 'bus_station']
        }, {
            name: 'Trein',
            value: ['train_station']
        }, {
            name: 'Metro',
            value: ['subway_station']
        }, {
            name: 'Bus',
            value: ['bus_station']
        }];

        $scope.chosenTransportType = $scope.transportTypeOptions[0];

        $scope.location = null;

        $scope.nearbyStations = [];

        $scope.chosenStation = null;


        GeoService.getCurrentLocation().then(function onSuccess(location) {

            var TAG = TAG + '[GeoService.getCurrentLocation.onSuccess()]';

            $log.info(TAG, 'Success event:', location);

            $scope.location = location;

            var coords = location.coords;
            var latLon = new google.maps.LatLng(coords.latitude, coords.longitude);
            var chosenStationType = $scope.chosenTransportType;

            $log.info(TAG, 'chosenStationType:', chosenStationType);

            GoogleMapsService.radarSearch({
                location: latLon,
                radius: 5000,
                types: chosenStationType.value
            }).then(function onSuccess(results) {

                    var TAG = TAG + '[GoogleMapsService.radarSearch.onSuccess()]';

                    $scope.nearbyStations = [];

                    angular.forEach(results, function (place) {
                        GoogleMapsService.getDetails(place).then(function onSuccess(result) {
                            var TAG = TAG + '[GoogleMapsService.getDetails(place)]';
                            $log.info(TAG, 'Success event:', result);
                            $scope.nearbyStations.push(result);
                        }, function onError(results, status) {
                            var TAG = TAG + '[GoogleMapsService.getDetails(place)]';
                            $log.error(TAG, arguments, place);
                        });
                    });

                }, function onError(results, status) {
                    var TAG = TAG + '[GoogleMapsService.radarSearch.onError()]';
                    $log.error(TAG, arguments);
                });

        }, function onError(error) {
            var TAG = TAG + '[GeoService.getCurrentLocation.onError()]';
            $log.error(TAG, arguments);
        });

    });
