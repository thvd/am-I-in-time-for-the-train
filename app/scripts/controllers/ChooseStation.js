'use strict';

angular.module('amIInTimeForTheTrainApp')
    .controller('ChooseStationCtrl', function ($scope, GeoService) {

        GeoService.watchLocation();

        $scope.location = '';


        GeoService.getCurrentLocation().then(function onSuccess(l) {
            debugger;
            $scope.$apply(function () {
                $scope.location = l;
            });
        }, function onError() {
            debugger;
        });

        $scope.$on('onLocationChanged', function(l) {
            $scope.location = l;
        });

    });
