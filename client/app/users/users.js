angular.module('drone.users', [])

.controller('PilotController', function ($scope, $location, UserFactory) {
  

  $scope.link = {};
  //query the database to return all pilots in the database. Return based on SOME criteria

  $scope.addLink = function () {
    $scope.loading = true;
    Links.addLink($scope.link)
      .then(function () {
        $scope.loading = false;
        $location.path('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  });