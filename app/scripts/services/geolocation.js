'use strict';

/**
 * Starting Source: http://jsfiddle.net/jamey777/Xmnqx/3/
 */

angular.module('amIInTimeForTheTrainApp')
  .factory('GeoService', function ($q, $rootScope, $timeout, $log) {
    var api = {
      getCurrentLocation: function (options) {
        var deferred = $q.defer();

        var TAG = '[amIInTimeForTheTrainApp.GeoService.getCurrentLocation(' + arguments + ')]';

        if (!navigator.geolocation) {
          $log.error(TAG, 'navigation.geolocation is not enabled.');
          deferred.reject('location services not allowed');
          return deferred.promise;
        }

        navigator.geolocation.getCurrentPosition(function (position) {
          $rootScope.$apply(function () {
            deferred.resolve(position);
          });
          $log.info(TAG, 'Position update-success:', arguments);
        }, function (error) {
          $rootScope.$apply(function () {
            deferred.reject(error);
          });
          $log.error(TAG, 'Position update-error:', arguments);
        }, options);

        $log.info(TAG, 'return promise:', deferred.promise);

        return deferred.promise;
      },
      _watchLocationId: null,
      startWatchLocation: function () {

        var TAG = '[GeoService.watchLocation()]';

        if (!navigator.geolocation) {
          $log.error(TAG, 'navigation.geolocation is disabled.');
          return;
        }

        $log.info(TAG, 'Started watchPosition service.');

        api._watchLocationId = navigator.geolocation.watchPosition(function (position) {
          $log.info(TAG, 'Position update-success:', position);
          $rootScope.$broadcast('onLocationChanged', position);
        }, function (error) {
          $log.error(TAG, 'Position update-error:', error);
        });
      },
      stopWatchLocation: function() {
        var TAG = '[GeoService.stopWatchLocation()]';
        var watchId = api._watchLocationId;
        if (!api.isWatchLocationEnabled()) {
          $log.warn(TAG, 'WatchLocation is not started yet, first start watchPosition: `startWatchLocation()`');
        } else {
          navigator.geolocation.clearWatch(watchId);
          $log.info(TAG, 'Stopped watchPosition service.');
        }
      },
      isWatchLocationEnabled: function () {
        return api._watchLocationId !== null && angular.isDefined(api._watchLocationId);
      }
    };

    return api;
  });