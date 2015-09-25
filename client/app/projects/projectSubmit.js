angular.module('drone.projects', [])

.controller('SubmitProjectController', function ($scope, $location, ProjectFactory) {

  $scope.project = {};
  //write a function that adds a data-scope property to the


  $scope.addProject = function () {
    $scope.loading = true;
    ProjectFactory.addProject($scope.project)
      .then(function () {
        $scope.loading = false;
        $location.path('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  });
