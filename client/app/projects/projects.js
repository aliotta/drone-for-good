angular.module('drone.projects', [])

.controller('ProjectController', function ($scope, $location, $window, ProjectFactory) {
  //for the adding of the project
  $scope.project = {};
  //for the retriving of all the projects
  $scope.data = {};

  //A function to add a project to our database
  $scope.addProject = function () {
    //commented out because it is unused look at map.js update marker... TODO chnage this fact

    // var username = $window.localStorage["com.drone.username"];
    // var project = $scope.project
    // project.username = username;
    // console.log("PROJECT ADDED", project)
    // ProjectFactory.addProject(project)
    //   .then(function () {
    //     //just because ...?
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
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
