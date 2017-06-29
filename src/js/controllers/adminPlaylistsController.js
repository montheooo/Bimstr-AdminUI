'use strict';

app.controller('PlaylistsController', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes', 'Playlists', function($scope, $http, $filter, editableOptions, editableThemes, Playlists) {
    $scope.alerts = [];
    $scope.playlists = [];
    $scope.vue = true;
    $scope.playlists = Playlists.query();
    console.log(playlists);

	  $scope.dateCreation=function(date) {
	 	return new Date(date).toDateString();
    }

      $scope.initPlaylists = function () {
          $scope.playlists = Playlists.query(); //fetch all Playlists. Issues a GET to /api/Playlists
      };
        
      $scope.initMusics = function (playlist) {
          return $scope.musics = playlist.songs;
      }

      $scope.removePlaylist = function (index, data) {

          $scope.playlist.splice(index, 1);

          return Playlists.delete({ id: data }, null, function () {

            $scope.vue = false;
            $scope.alerts.push({ type: 'danger', msg: "Data will be definitly delete from the dataBase" });
          });

    };
}]);