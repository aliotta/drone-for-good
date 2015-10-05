angular.module('drone.map', [])

.controller('MapController', function ($scope, $location, ProjectFactory) {
  //Get project data
  $scope.data = {};
  $scope.locations = [];
  $scope.descriptions = [];

  //Set image url for marker, and change orgin/anchor so 
  //flagpole bottom centered on marker coordinates
  var image = {
    url: '../../assets/tiny_green_flag',
    //size: new google.maps.Size(20, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32)
  };

  //A method to get project data from project factory, and populate
  //scope properties with coordinates and descriptions.
  $scope.getProjects = function() {
    ProjectFactory.getProjects()
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
  };

  //Invoke getProjects to populate our locations and descriptions arrays
  $scope.getProjects();

  //A function for creating a new info window.  
  $scope.makeInfoWindow = function (contentString) {
    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200
    });
    return infowindow;
  }

  //Function for adding markers to map object
  $scope.addMarker = function (location, map, infowindow) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: image
    });
    marker.addListener('click', function () {
      infowindow.open(map, marker);
    })
  };

  //TEST CODE for updating markers when new project submitted
  $scope.updateMarker = function() {
    $scope.getProjects();
    var newLocation = $scope.locations[$scope.locations.length-1];
    var newDescription = $scope.descriptions[$scope.descriptions.length-1];
    $scope.addMarker(newLocation, map, $scope.makeInfoWindow(newDescription));
  }




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
        map = new google.maps.Map(mapCanvas, mapOptions)

        //Attach all no fly zone geoJSON data 
        map.data.loadGeoJson('../../assets/5_mile_airport.geojson');
        map.data.loadGeoJson('../../assets/us_military.geojson');
        map.data.loadGeoJson('../../assets/us_national_park.geojson');

        //Set main styles for no fly zone data
        map.data.setStyle({
          fillOpacity: .5,
          strokeWeight: 2,
          fillColor: 'red'
        });

        // Iterate over testMarkers and add a marker for each one.
        // Pass addMarker a latLng, map instance, and infowindow instance
        for (var i = 0; i < $scope.locations.length; i++) {
          var location = $scope.locations[i];
          $scope.addMarker(location, map, $scope.makeInfoWindow($scope.descriptions[i]) );
        }

  }

  //When page loads, create the map
  google.maps.event.addDomListener(window, 'load', $scope.initialize);
});



