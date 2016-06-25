'use strict';

/* Controllers */
  // signout controller
  	app.controller('AlertCtrl', function($location, $auth, $state, $scope) {
	    $scope.closeAlert = function(index) {
      		$scope.alerts.splice(index, 1);
    	};
  	});