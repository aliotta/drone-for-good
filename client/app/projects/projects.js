angular.module('drone.projects', [])

.controller('ProjectController', function ($scope, $location, ProjectFactory) {
  //for the adding of the project
  $scope.project = {};
  //for the retriving of all the projects
  $scope.data = {};

  //A function to add a project to our database
  $scope.addProject = function () {
    // $scope.loading = true;
    ProjectFactory.addProject($scope.project)
      .then(function () {
        // $scope.loading = false;
        // $location.path('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Add a function to get all existing projects from the database

  $scope.getProjects = function () {
    ProjectFactory.getProjects()
      .then(function (projects) {
        $scope.data.openProjects = projects; 
      })
      .catch(function (error) {
        console.log(error);
      });
  } 

  //Invoke it initally so all projects load into the view
  $scope.getProjects();
  });
