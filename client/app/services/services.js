angular.module('drone.services', [])


//Map Factory
.factory('MapFactory', function ($http) {

})
.factory('UserFactory', function ($http, $window) {
  //get all users function
  console.log("what do you mean")
  var getUser = function (username) {
    return $http({
      method: 'GET',
      url: '/api/users/' + username
    })
    .then(function (resp) {
      return resp.data;
    });
  }

  return {
    getUser: getUser
  };

})
.factory('ProjectFactory', function ($http) {
  //make an http request with project path to fetch all
  //entries from project table in the db
  var getProjects = function () {
    //get method
    return $http({
      method: 'GET',
      url: '/api/projects'
    })
    .then(function (resp) {
      return resp.data;
    })
  };

  //make an http POST request to add a project to the
  //project table in the DB.
  var addProject = function (project) {
    //post method
    return $http({
      method: 'POST',
      url: '/api/projects',
      data: project
    })
    .then(function (resp) {
      return resp;
    })

  }


  //return all functions
  return {
    getProjects: getProjects,
    addProject: addProject
  };
})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.drone'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    console.log(user, " USER")
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      console.log(resp, " RESP")
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.drone');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.drone');
    $window.localStorage.removeItem('com.drone.username');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
