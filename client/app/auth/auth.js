// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('drone.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {

    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.drone', token);
        $window.localStorage.setItem('com.drone.username', $scope.user.username);
        $location.path('/projects');
      })
      .catch(function (error) {
        console.error(error, " in auth.js signin error");
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.drone', token);
        $window.localStorage.setItem('com.drone.username', $scope.user.username);
        $location.path('/projects');
      })
      .catch(function (error) {
        console.error(error, " in auth.js error");
      });
  };

  $scope.logout = function () {
    Auth.signout()
  }
});
