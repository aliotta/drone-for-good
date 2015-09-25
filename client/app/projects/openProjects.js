angular.module('drone.projects', [])

.controller('OpenProjectController', function ($scope, $location, ProjectFactory) {
  // Your code here

  $scope.link = {};

  //Define function on scope object that uses function from project Factory
  //to fetch most recent projects

  //list projects, with most recent on top

  //Create a function that will drop-down display the project's details, 
  //if the project is clicked on. 


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
