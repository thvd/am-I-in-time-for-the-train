'use strict';

angular.module('amIInTimeForTheTrainApp')
  .filter('take', function () {
    return function (input, countRange) {
      return input.slice(0, parseInt(countRange, 10));
    };
  });
