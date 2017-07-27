
'use strict';

/* Controllers */
  // signout controller
  app.controller('SignoutCtrl', function($location, $auth, $state, $scope) {
	    if (!$auth.isAuthenticated()) { return; }
	    $auth.logout()
	      .then(function() {
	      	$scope.alerts = [];
	      	console.log($auth.getToken());
	      	$scope.alerts.push({type: 'success', msg: 'Aurevoir! Et a bientôt sur BimStr'});
	      	$state.go('app.dashboard');
	      });
  });

