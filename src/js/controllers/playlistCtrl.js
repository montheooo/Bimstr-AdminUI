app.controller('playlistCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes', 'Playlist','Song2playlist','Song','saveSong2playlist', 
  function($scope, $filter, $http, editableOptions, editableThemes, Playlist, Song2playlist, Song, saveSong2playlist ){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

    $scope.alerts = [];
    $scope.echec = null;
    
    $scope.vue = true;  // show playlist form
    $scope.vue2 = false; // show song of playlist
    $scope.so = {};      //  submit song to playlist
    $scope.playlist={};
    $scope.playlist.songs=[];
    $scope.playlists_songs = [];

  // show songs of playlist

    $scope.morePlaylist = function(index, playid){

       $scope.playlists_songs= $scope.playlists[index].songs;
       $scope.vue = false;
       $scope.vue2 = true;
       $scope.playlistId = playid;
       $scope.songs = Song.query();
       console.log($scope.playlists_songs);
       console.log($scope.playlistId);

    }

    // save song to playlist

    $scope.savePlaylist_song = function(data, songid){

      //$scope.user not updated yet
      console.log(data);
      angular.extend(data, {songId: songid});
      angular.extend(data, {playlistId: $scope.playlistId});
      console.log (data);
     return saveSong2playlist.update({playlistId: $scope.playlistId, songId:songid }, data, function(){
       $scope.vue =false;
       $scope.alerts.push({type: 'success', msg: "Les informations ont été modifiées dans la base de données"});
     });


    }

    // remove song to playlist

    $scope.removePlaylist_song = function(index, data){

      $scope.playlists_songs.splice(index, 1);
    
    return Song2playlist.delete({id: data}, null, function(){

       $scope.vue=false;
      $scope.alerts.push({type: 'danger', msg: "Les informations ont été suprimées de la base de données"});
      

      }, function(){

        $scope.echec = "echec";
        alert($scope.echec);
        console.log($scope.echec);

      });
           

    }

    // Back to Playlists

    $scope.showPlaylist = function(){

      $scope.vue2 = false;
      $scope.vue = true;
       
    }

    $scope.addPlaylist_song = function(){    

      $scope.Playlist_song = Playlist_Song.save(null, $scope.s, function(){

      $scope.vue = true;
      $scope.vue2 = false;

      })
    }

    $scope.addPlaylist2song = function(){

      angular.extend($scope.so, {playlistid: $scope.playlistId});
      console.log($scope.so);

      return Song2playlist.save(null, $scope.so, function(){

      $scope.vue2 = true;
      $scope.vue = false;
      $scope.so = null;
      $scope.alerts.push({type: 'info', msg: "Les informations ont été ajoutées dans la base de données"});
      $scope.playlists= Playlist.query();

      })

    }

    $scope.addAlert = function() {

      $scope.alerts.push({type: 'success', msg: "Les informations ont été enregistrées"});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
      $scope.vue= true;
    };

    $scope.initPlaylist = function(){

    $scope.playlists= Playlist.query();

    };


    $scope.groups = [];
    

    $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('api/groups').success(function(data) {
        $scope.groups = data;
      });
    };
    
   
    $scope.checkName = function(data, id) {
      if (id === 100001 && data !== 'awesome') {
        return "Username 2 should be `awesome`";
      }
    };
      //
    $scope.savePlaylist = function(data, id) {
      //$scope.user not updated yet
      console.log(data);
      angular.extend(data, {id: id});
     return Playlist.update({id: id}, data, function(){
       $scope.vue =false;
       $scope.alerts.push({type: 'success', msg: "Les informations ont été modifiées dans la base de données"});
     });

    };

     // remove Playlist
    $scope.removePlaylist = function(index, data) {
    
    $scope.playlists.splice(index, 1);
    
    return Playlist.delete({id: data}, null, function(){

       $scope.vue=false;
      $scope.alerts.push({type: 'danger', msg: "Les informations ont été suprimées de la base de données"});
      

      });
           
    };
  
     // add Playlist

    $scope.addPlaylist = function() {

      $scope.playlists.push($scope.pla);
      console.log($scope.playlists);

    return  Playlist.save($scope.pla, function(){

      $scope.vue=false;
      $scope.pla=null;
      $scope.alerts.push({type: 'info', msg: "Les informations ont été ajoutées dans la base de données"});
      $scope.playlists= Playlist.query();
      


    });
       


    };

   

}]);
