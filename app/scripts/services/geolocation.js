'use strict';

/**
 * Starting Source: http://jsfiddle.net/jamey777/Xmnqx/3/
 */

angular.module('amIInTimeForTheTrainApp')
    .factory('GeoService', ['$q', '$rootScope', '$timeout', function ($q, $rootScope, $timeout) {
        return {
            getCurrentLocation: function () {
                var d = $q.defer();

                if (!navigator.geolocation) {
                    d.reject('location services not allowed');
                    return d.promise;
                }

//                $timeout(function () {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        debugger;
//                        $rootScope.$apply(function () {
//                            $rootScope.$broadcast("locationChanged", {
//                                coordinates: coords
//                            });
//
//                            d.resolve(position);
//
//                        });

                        d.resolve(position);

                    }, function (error) {
                        debugger;
                        d.reject(error);
                    });
//                }, 1000);

                return d.promise;
            },
            watchLocation: function () {

                if (!navigator.geolocation) {
                    return;
                }

                navigator.geolocation.watchPosition(function (position) {
                    $rootScope.$broadcast("onLocationChanged", position);
                }, function (error) {
                    debugger;
                });
            }
        };
    }]);