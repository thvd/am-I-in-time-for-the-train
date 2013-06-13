/*GooglePlaceService.radarSearch({
 location: latLon,
 radius: 5000,
 types: [ 'train_station' ]
 }, function(results, status) {

 if (status != google.maps.places.PlacesServiceStatus.OK) {
 alert(status);
 return;
 }

 $scope.$apply(function() {
 $scope.nearbyStations = [];
 });

 results.forEach(function(place) {
 GooglePlaceService.getDetails(place, function(result, status) {
 if (status != google.maps.places.PlacesServiceStatus.OK) {
 alert(status);
 return;
 }

 $scope.$apply(function() {
 $scope.nearbyStations.push(result);
 });
 })
 });
 });*/