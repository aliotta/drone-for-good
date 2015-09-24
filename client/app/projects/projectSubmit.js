angular.module('drone.shorten', [])

.controller('SubmitProjectController', function ($scope, $location, projectFactory) {
  // Your code here

  $scope.link = {};
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
