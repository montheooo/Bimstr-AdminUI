app.controller('playlistCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes', 'Playlist','Song2playlist','Song','saveSong2playlist','Video',
  function($scope, $filter, $http, editableOptions, editableThemes, Playlist, Song2playlist, Song, saveSong2playlist, Video ){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

      
    $scope.vue = true;  // show playlist form
    $scope.vue_audio = false;  // show playlist form
    $scope.vue2 = false; // show song of playlist
    $scope.so = {};      //  submit song to playlist
    $scope.playlist={};  // add playlist to table
    $scope.playlist.songs=[];  // add songs of one playlist
    $scope.playlists_songs = []; // add songs of playlist index
    $scope.songs = Song.query();  // get all song
    $scope.videos = Video.query(); // get all videos

  // show songs of playlist

    $scope.morePlaylist = function(index, playid){
       $scope.playlists_songs= $scope.playlists[index].songs;  //save the songs of current playlist index
       $scope.index= index;      // save index
       $scope.vue = false;
       $scope.vue2 = true;
       $scope.playlistId = playid;  //get playlist id
       

    }

    // save song to playlist

    $scope.savePlaylist_song = function(data, songid){
      
      angular.extend(data, {songId: songid});
      angular.extend(data, {playlistId: $scope.playlistId});
      
     return saveSong2playlist.update({playlistId: $scope.playlistId, songId:songid }, data, function(){
       
        alert("le song de la playlist a été mis à jour");
        $scope.playlists= Playlist.query();
     }, function(){
        alert("le song de la playlist  n'a pas été mis à jour ");
        $scope.playlists= Playlist.query();
     });

    }

    // remove song to playlist

    $scope.removePlaylist_song = function(index, data){

      $scope.playlists_songs.splice(index, 1);
    
    return Song2playlist.delete({id: data}, null, 

      function(){
      
         alert("le song a pas été suprimé de la playlit");
         $scope.playlists= Playlist.query();
      }, 
      function(){  
        alert("le song n'a pas été suprimé de la playlit");
        $scope.playlists= Playlist.query();
      });
           
    }

    // Back to Playlists

    $scope.showPlaylist = function(){

      $scope.vue2 = false;
      $scope.vue = true;
       
    }

    $scope.addPlaylist2song = function(){

      angular.extend($scope.so, {playlistid: $scope.playlistId});
     
      return Song2playlist.save(null, $scope.so, function(){
     
      $scope.so = null;

        alert("le song a été ajouté à la playlist");
      }, function(){
        alert("le song n'a pas été ajouté à la playlist");
      })

    }

     $scope.addPlaylist2video = function(){

      angular.extend($scope.so, {playlistid: $scope.playlistId});
  
      return Song2playlist.save(null, $scope.so, function(){
      $scope.playlists= Playlist.query(function(){
      $scope.playlists_songs= $scope.playlists[$scope.index].songs;        
      });
      
      $scope.so = null;
      alert("la video a été ajoutée à la playlist");
      }, function(){
        alert("la video n'a pas été ajoutée à la playlist");
      })

    }

    // init playlist table
    $scope.initPlaylist = function(){
    $scope.playlists= Playlist.query();
    };


    $scope.groups = [];
    
    // select group True or False
    $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('api/groups').success(function(data) {
        $scope.groups = data;
      });
    };
    
      // update playlist
    $scope.savePlaylist = function(data, id) {
      console.log(data);
      angular.extend(data, {id: id});
     return Playlist.update({id: id}, data, function(){
       
       alert("les informations ont  été mis à jour en base de données");
       $scope.playlists= Playlist.query();
     }, function(){
      alert("les informations n'ont pas été mis à jour en base de données");
      $scope.playlists= Playlist.query();
     });

    };

     // remove Playlist
    $scope.removePlaylist = function(index, data) {   
     
    return Playlist.delete({id: data}, null, function(){
      
       alert("les informations ont été suprimées de la base de données");
       $scope.playlists= Playlist.query();
      }, function(){
        alert("les informations n'ont pas été suprimées de la base de données");
        $scope.playlists= Playlist.query();
      });
           
    };  
     // add Playlist
    $scope.addPlaylist = function() {
     
    return  Playlist.save($scope.pla, function(){
      
      $scope.pla=null;
      alert("les informations ont été ajoutées à la base de données");
      $scope.playlists= Playlist.query();
    }, function(){
      alert("les informations n'ont pas été ajoutées à la base de données");
      $scope.playlists= Playlist.query();
    });
    };
}]);
