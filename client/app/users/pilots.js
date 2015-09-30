angular.module('drone.pilots', [])

.controller('PilotsController', function ($scope, $location, UserFactory) {
  //Make a pilot object a property of the scope
  $scope.pilot = {};

  //A method for making an api call to populate pilot object with relevant properties
  $scope.getProfile = function () {
    UserFactory.getProfile()
      .then(function (profile) {
        $scope.pilot = profile; 
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  $scope.getProfile();

  });