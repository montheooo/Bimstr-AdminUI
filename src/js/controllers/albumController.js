'use strict';

app.controller('AlbumController', function($scope, $state, $window, $location, $auth, uiGridConstants, Album, Playlists) {
    $scope.albums = [];
    $scope.albums = Album.query(); //fetch all movies. Issues a GET to /api/movies
    $scope.addAlert = function () {
        $scope.alerts.push({ type: 'success', msg: "Your playlist have been saved" });
    };
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
        $scope.vue = true;
    };
});



app.controller('MovieViewController', function($scope, $stateParams, Movie) {
  $scope.movie = Movie.get({ id: $stateParams.id }); //Get a single movie.Issues a GET to /api/movies/:id
})

app.controller('MovieCreateController', function($scope, $state, $stateParams, Movie) {
  $scope.movie = new Movie();  //create new movie instance. Properties will be set via ng-model on UI

  $scope.addMovie = function() { //create a new movie. Issues a POST to /api/movies
    $scope.movie.$save(function() {
      $state.go('movies'); // on success go back to home i.e. movies state.
    });
  };
})
app.controller('MovieEditController', function($scope, $state, $stateParams, Movie) {
  $scope.updateMovie = function() { //Update the edited movie. Issues a PUT to /api/movies/:id
    $scope.movie.$update(function() {
      $state.go('movies'); // on success go back to home i.e. movies state.
    });
  };
});
