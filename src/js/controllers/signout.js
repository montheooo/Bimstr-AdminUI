
'use strict';

/* Controllers */
  // signout controller
  app.controller('SignoutCtrl',  function($location, $auth, $state, $scope, notify) {

  	$scope.msg = 'Aurevoir! à bientot sur BimStr';
    $scope.template = '';
    $scope.positions = ['center', 'left', 'right'];
    $scope.position = $scope.positions[2];
    $scope.classes= "alert-success";
    $scope.duration = 10000;

	    if (!$auth.isAuthenticated()) { return; }
	    $auth.logout()
	      .then(function() {
	      	$scope.alerts = [];
	      	console.log($auth.getToken());
	      	$scope.user.avatar = 'img/a0.jpg';
	      	$scope.user.name = '';
	      	$scope.user.lname = '';
	      	 notify({
            message: $scope.msg,
            classes: $scope.classes,
            templateUrl: $scope.template,
            position: $scope.position,
            duration: $scope.duration
        });
	      	$state.go('app.dashboard');
	      });
  });

