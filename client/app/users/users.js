angular.module('drone.users', [])

.controller('UsersController', function ($scope, $location, UserFactory, $window) {
  //Make a user object a property of the scope
  $scope.user = {};

  //A method for making an api call to populate user object with relevant properties
  $scope.getProfile = function () {
    UserFactory.getUser($window.localStorage["com.drone.username"])
      .then(function (profile) {
        $scope.user = profile;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  $scope.getProfile();

  });
