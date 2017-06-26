'use strict';

app.controller('PlaylistsController', function($scope, $http, $filter, editableOptions, editableThemes, Playlists) {
    $scope.playlists = Playlists.Show_all(); //fetch all Playlists. Issues a GET to /api/Playlists
	  $scope.dateCreation=function(date) {
	 	return new Date(date).toDateString();
  }

      $scope.musics = function (playlist) {
          return playlist.songs;
      }
});