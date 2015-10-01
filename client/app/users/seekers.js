angular.module('drone.seekers', [])

.controller('SeekersController', function ($scope, $location, UserFactory) {
  //Make a seeker object a property of the scope
  $scope.seeker = {};

  //A method that makes an api call to fill the seeker object with the relevant
  //properties
  $scope.getProfile = function () {
    UserFactory.getUser()
      .then(function (profile) {
        $scope.seeker = profile; 
      })
      .catch(function (error) {
        console.log(error);
      });
  }

    $scope.getProfile();
  });
