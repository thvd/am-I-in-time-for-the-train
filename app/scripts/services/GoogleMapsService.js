/* global google: false */
'use strict';

angular.module('amIInTimeForTheTrainApp')
  .factory('GoogleMapsService', function ($rootScope, $q, $log) {

    var elem = document.createElement('div');

    var placesService = new google.maps.places.PlacesService(elem);
    var distanceMatrixService = new google.maps.DistanceMatrixService();

    function resolveGoogleCallbackToDeferred(deferred, result, status) {
      $rootScope.$apply(function onRootScopeApply() {
        if (status === google.maps.places.PlacesServiceStatus.OK || status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          deferred.resolve(result, status);
        } else {
          deferred.reject(result, status);
        }
      });
    }


    // Public API
    var api = {
      /**
       * @param {google.maps.places.RadarSearchRequest} requestObj
       * @returns {Promise}
       */
      radarSearch: function (requestObj) {
        var d = $q.defer();

        placesService.radarSearch(requestObj, function onDoneCallback(result, status) {
          resolveGoogleCallbackToDeferred(d, result, status);
        });

        return d.promise;
      },
      /**
       * @param {google.maps.places.PlaceSearchRequest} requestObj
       * @returns {Promise.<google.maps.places.PlaceResult>}
       */
      nearbySearch: function (requestObj) {
        var d = $q.defer();

        placesService.nearbySearch(requestObj, function onDoneCallback(result, status) {
          resolveGoogleCallbackToDeferred(d, result, status);
        });

        return d.promise;
      },
      /**
       * @param {google.maps.places.PlaceDetailsRequest} place
       * @returns {Promise}
       */
      getDetails: function (place) {
        var d = $q.defer();

        placesService.getDetails(place, function onDoneCallback(result, status) {
          resolveGoogleCallbackToDeferred(d, result, status);
        });

        return d.promise;
      },
      /**
       * @param {Array.<google.maps.places.PlaceDetailsRequest>} places
       * @returns {Promise}
       */
      getDetailsOfMany: function (places) {
        var cachePromises = [];

        angular.forEach(places, function (place) {
          var _d = $q.defer();
          cachePromises.push(_d.promise);

          placesService.getDetails(place, function onDoneCallback(result, status) {
            $rootScope.$apply(function () {
              var TAG = '[amIInTimeForTheTrainApp.GoogleMapsService.getDetailsOfMany()][placesService.getDetails(place)]';
              if (status === google.maps.places.PlacesServiceStatus.OK || status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
                $log.info(TAG, 'Success state', result, status);
                _d.resolve(result, status);
              } else {
                $log.warn(TAG, 'Error state', result, status);
                _d.reject(result, status);
              }
            });
          });
        });

        var resultPromise = $q.all(cachePromises);
        return resultPromise;
      },
      /**
       * @param {google.maps.DistanceMatrixRequest} requestObj
       * @returns {Promise.<google.maps.DistanceMatrixResponse>}
       */
      getDistanceMatrix: function (requestObj) {
        var d = $q.defer();
        distanceMatrixService.getDistanceMatrix(requestObj, function onDistanceMatrix(result, status) {
          resolveGoogleCallbackToDeferred(d, result, status);
        });

        return d.promise;
      }
    };

    return api;
  });
