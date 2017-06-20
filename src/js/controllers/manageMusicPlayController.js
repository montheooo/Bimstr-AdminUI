'use strict';

app.controller('MusicPlayController', function ($scope, $http, $filter, editableOptions, editableThemes, MusicPlay) {
    $scope.playlists = Playlists.show_all(); //fetch all Playlists. Issues a GET to /api/Playlists

    $scope.dateCreation = function (date) {
        return new Date(date).toDateString();
    }
});