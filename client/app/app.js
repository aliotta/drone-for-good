angular.module('drone', [
  'drone.services',
  'drone.auth',
  'drone.map', 
  'drone.projects', 
  'drone.users',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/about', {
      templateUrl: 'app/about/about.html',
      // controller: 'ProjectController',
    })
    //for signing in and signing up
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    // Your code here
    .when('/map', {
      templateUrl: 'app/map/map.html',
      controller: 'MapController',
      authenticate: true,
    })
    .when('/projects', {
      templateUrl: 'app/projects/openProjects.html',
      controller: 'ProjectController',
    })
    .when('/submitProjects', {
      templateUrl: 'app/projects/projectSubmit.html',
      controller: 'ProjectController',
      authenticate: true,
    })
    // .when('/testimonials', {
    //   templateUrl: 'app/profile/links.html',
    //   controller: 'TestimonialsController',
    //   authenticate: true,
    // })
    // .when('/about', {
    //   templateUrl: 'app/profile/links.html',
    //   controller: 'AboutController',
    //   authenticate: true,
    // })
  
    .when('/userProfile', {
      templateUrl: 'app/users/users.html',
      controller: 'UsersController',
      authenticate: true,
    })
    .otherwise({
      redirectTo: '/signin'
    });
    
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.drone');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
