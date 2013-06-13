'use strict';

angular.module('amIInTimeForTheTrainApp')
    .factory('GoogleMapsService', function ($rootScope, $q) {

        var elem = document.createElement('div');

        var placesService = new google.maps.places.PlacesService(elem);

        function resolveGoogleCallbackToDeferred(deferred, result, status) {
            $rootScope.$apply(function onRootScopeApply() {
                if (status === google.maps.places.PlacesServiceStatus.OK || status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
                    deferred.resolve(result, status);
                } else {
                    deferred.reject(result, status);
                }
            });
        }


        // Public API here
        return {
            /**
             * @param {RadarSearchRequest} requestObj
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
             * @param {PlaceDetailsRequest} place
             * @returns {Promise}
             */
            getDetails: function (place) {
                var d = $q.defer();

                placesService.getDetails(place, function onDoneCallback(result, status) {
                    resolveGoogleCallbackToDeferred(d, result, status);
                });

                return d.promise;
            }
        };
    });
