angular.module('drone.map', [])

.controller('MapController', function ($scope, $location, ProjectFactory) {
  //Get project data
  $scope.data = {};
  $scope.locations = [];
  $scope.descriptions = [];

  //Initialize map object and add to dom
  $scope.initialize = function () {
        //Grab map element in DOM and specify options
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
          center: new google.maps.LatLng(37.789, -122.416),
          zoom: 9,
          mapTypeId: google.maps.MapTypeId.HYBRID
        }
        //Make new instance of google maps object
        var map = new google.maps.Map(mapCanvas, mapOptions)

        //Attach all no fly zone geoJSON data 
        map.data.loadGeoJson('https://raw.githubusercontent.com/mapbox/drone-feedback/master/sources/geojson/5_mile_airport.geojson');
        map.data.loadGeoJson('https://raw.githubusercontent.com/mapbox/drone-feedback/master/sources/geojson/us_military.geojson');
        map.data.loadGeoJson('https://raw.githubusercontent.com/mapbox/drone-feedback/master/sources/geojson/us_national_park.geojson');

        //Set main styles for no fly zone data
        map.data.setStyle({
          fillOpacity: .5,
          strokeWeight: 2,
          fillColor: 'red'
        });

        //Iterate over testMarkers and add a marker for each one.
        //Pass addMarker a latLng, map instance, and infowindow instance
        // for (var i = 0; i < testMarkers.length; i++) {
        //   var location = testMarkers[i];
        //   addMarker(location, map, makeInfoWindow(contentArray[i]) );
        // }

  }
  $scope.getProjects = function() {
    ProjectFactory.getProjects();
    .then(function (projectData) {
      for (var i = 0; i < projectData.length; i++) {
        var currentEntry = projectData[i];
        $scope.locations[i] = {
          lat: currentEntry.latitude, 
          lng: currentEntry.longitude
        };
        $scope.descriptions[i] = '<p>' + currentEntry.description + '</p>'
      }
    });

  }

      //When page loads, create the map
      google.maps.event.addDomListener(window, 'load', $scope.initialize);
    //Inject project data into DOM
    //

  });