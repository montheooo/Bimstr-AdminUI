      app.controller('UserInfoController', function($scope, $state, $window, $location, $auth, $localStorage) {
        $scope.user = $localStorage.loggedUser;
      } )