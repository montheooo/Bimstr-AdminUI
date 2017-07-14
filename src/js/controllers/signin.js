'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', '$auth', '$location', '$localStorage', 'notify', 'User',
  function($scope, $http, $state, $auth, $location, $localStorage, notify, User) {

var mon_token = {
  "response" : {
    "access_token" : "edf07638-78ca-4!"
    
  }
}


$auth.setToken(response.);

    $scope.msg = 'Bienvenue sur BimStr';
    $scope.template = '';
    $scope.positions = ['center', 'left', 'right'];
    $scope.position = $scope.positions[2];
    $scope.classes= "alert-success";
    $scope.duration = 10000;

    $scope.login = function() {
      $scope.authError = null;
      // Try to login
      $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
      .then(function(response) {
        if ( !response.data.user ) {
          $scope.authError = 'Email or Password not right';
        }else{
          $state.go('app.dashboard');
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };

    // $scope.login = function() {
    //   $auth.login($scope.user)
    //     .then(function() {
    //       $location.path('/');
    //     })
    //     .catch(function(error) {
    //       toastr.error(error.data.message, error.status);
    //     });
    // };

    $scope.logout = function() {
      if (!$auth.isAuthenticated()) { return; }
      $auth.logout()
        .then(function(response) {
          console.log(response.data);
          $state.go('login.dashboard');
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          //$localStorage.loggedUser  = User.getFacebookInfo();
          console.log(response);
          console.log($auth.getToken());
          console.log($auth.getPayload());
          console.log($localStorage.loggedUser);
          $state.go('app.dashboard');
          notify({
            message: $scope.msg,
            classes: $scope.classes,
            templateUrl: $scope.template,
            position: $scope.position,
            duration: $scope.duration
        });

          // $location.path('/');
/*          toastr.success('You have successfully signed in with ' + provider + '!');
          $location.path('/');*/
        })
        .catch(function(error) {
          $scope.classes= "alert-danger";
          if (error.error) {
            // Popup error - invalid redirect_uri, pressed cancel button, etc.
            $scope.msg = 'Oups! Erreur lors du login :'+ error.error;
          } else if (error.data) {
            // HTTP response error from server
            $scope.msg = 'Oups! Erreur lors du login :'+ error.data.message + error.status;
          } else {
            // toastr.error(error);
            $scope.msg = 'Oups! Erreur lors du login. Reesayez ulterieurement';
          }
          notify({
            message: $scope.msg,
            classes: $scope.classes,
            templateUrl: $scope.template,
            position: $scope.position,
            duration: $scope.duration
        });
        });
    };

  }])
;
