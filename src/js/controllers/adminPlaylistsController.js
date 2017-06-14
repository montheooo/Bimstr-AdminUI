'use strict';

app.controller('PlaylistsController', function($scope, $http, $filter, editableOptions, editableThemes, Playlists) {
  $scope.playlists = Playlists.show_all(); //fetch all Playlists. Issues a GET to /api/Playlists
  console.log($scope.playlists);
});