'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', '$auth', function($scope, $http, $state, $auth) {
    $scope.user = {};
    $scope.authError = null;
    // $scope.login = function() {
    //   $scope.authError = null;
    //   // Try to login
    //   $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
    //   .then(function(response) {
    //     if ( !response.data.user ) {
    //       $scope.authError = 'Email or Password not right';
    //     }else{
    //       $state.go('app.dashboard-v1');
    //     }
    //   }, function(x) {
    //     $scope.authError = 'Server Error';
    //   });
    // };

    $scope.login = function() {
      $auth.login($scope.user)
        .then(function() {
          alert('You have successfully signed in!');
          $location.path('/');
        })
        .catch(function(error) {
          toastr.error(error.data.message, error.status);
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          alert("Correctly logged in");
          $location.path('/');
/*          toastr.success('You have successfully signed in with ' + provider + '!');
          $location.path('/');*/
        })
        .catch(function(error) {
          if (error.error) {
            // Popup error - invalid redirect_uri, pressed cancel button, etc.
            toastr.error(error.error);
          } else if (error.data) {
            // HTTP response error from server
            toastr.error(error.data.message, error.status);
          } else {
            toastr.error(error);
          }
        });
    };

  }])
;