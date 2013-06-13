'use strict';

/**
 * Starting Source: http://jsfiddle.net/jamey777/Xmnqx/3/
 */

angular.module('amIInTimeForTheTrainApp')
    .factory('GeoService', function ($q, $rootScope, $timeout, $log) {
        return {
            getCurrentLocation: function () {
                var deferred = $q.defer();

                var TAG = '[amIInTimeForTheTrainApp.GeoService.getCurrentLocation(' + arguments + ')]';

                if (!navigator.geolocation) {
                    $log.error(TAG, 'navigation.geolocation is not enabled.');
                    deferred.reject('location services not allowed');
                    return d.promise;
                }

                navigator.geolocation.getCurrentPosition(function (position) {
                    $rootScope.$apply(function() {
                        deferred.resolve(position);
                    });
                    $log.info(TAG, 'Position update-success:', arguments);
                    //debugger;

                }, function (error) {
                    $rootScope.$apply(function() {
                        deferred.reject(error);
                    });
                    $log.error(TAG, 'Position update-error:', arguments);
                    debugger;
                });

                $log.info(TAG, 'return promise:', deferred.promise);

                return deferred.promise;
            }/*,
            watchLocation: function () {

                var TAG = '[amIInTimeForTheTrainApp.GeoService.watchLocation(' + arguments + ')]';

                if (!navigator.geolocation) {
                    $log.error(TAG, 'navigation.geolocation is not enabled.');
                    return;
                }

                navigator.geolocation.watchPosition(function (position) {
                    $log.info(TAG, 'Position update-success:', arguments);
                    $rootScope.$broadcast("onLocationChanged", position);
                }, function (error) {
                    $log.error(TAG, 'Position update-error:', arguments);
                    debugger;
                });
            }*/
        };
    });