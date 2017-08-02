app.controller('ModalInstancePlaylistCtrl', ['$scope', '$modalInstance', 'items',  function($scope, $modalInstance, items ) {
    $scope.items = items;
    console.log($scope.items);

    $scope.OK = function () {
      $modalInstance.close($scope.items);
      
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };


  }]);


app.controller('playlistCtrl', ['$scope', '$filter', '$http', '$modal', '$log', 'editableOptions', 'editableThemes', 'Playlist','Song2playlist','Song', 'RmSong2playlist', 'saveSong2playlist','Video','User',
  function($scope, $filter, $http, $modal, $log, editableOptions, editableThemes, Playlist, Song2playlist, Song, RmSong2playlist, saveSong2playlist, Video, User ){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

    $scope.selected ;
    $scope.open = function (playlist) {

          var modalInstance = $modal.open({
            templateUrl: 'deleteContent.html',
             controller: 'ModalInstancePlaylistCtrl',
             size: 'sm',
             resolve: {
              items: function () {
                $scope.selected = playlist ;
                angular.extend($scope.selected, {playlistid: $scope.playlistId});
                return $scope.selected ;
                
              }
            }

          });

              console.log($scope.selected);

            modalInstance.result.then(function (selectedItem) {
                  $scope.select = selectedItem;
            
                  return Playlist.delete({id: $scope.select.id}, null, function(){
                   
                      $scope.playlists= Playlist.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstancePlaylistCtrl',
                       size: 'sm',
                       resolve: {
                            items: function () {
                              
                              return $scope.selected ;
                              
                            }
                          }

                      });

                      }, function(){
                      
                        $scope.playlists= Playlist.query();
                        var modalInstance = $modal.open({
                        templateUrl: 'rejectContent.html',
                         controller: 'ModalInstancePlaylistCtrl',
                         size: 'sm',
                         resolve: {
                              items: function () {
                                
                                return $scope.selected ;
                                
                              }
                            }
                      
                        });
                  
                    });
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });        

    }

    $scope.open2 = function (songid) {

          var modalInstance = $modal.open({
            templateUrl: 'deleteContent.html',
             controller: 'ModalInstancePlaylistCtrl',
             size: 'sm',
             resolve: {
              items: function () {
                $scope.selected = songid ;
                angular.extend($scope.selected, {playlistid: $scope.playlistId});

                return $scope.selected ;                
              }
              
            }

          });

              console.log($scope.selected);
            
            modalInstance.result.then(function (selectedItem) {
                  $scope.select = selectedItem;
                  
                console.log($scope.select);
             

            
                  return RmSong2playlist.update({playlistId:$scope.select.playlistid, songId:$scope.select.id }, null, function(){
                      $scope.playlists= Playlist.query(function(){
                      $scope.playlists_songs= $scope.playlists[$scope.index].songs;        
                      });
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstancePlaylistCtrl',
                       size: 'sm',
                       resolve: {
                            items: function () {
                              
                              return $scope.selected ;
                              
                            }
                          }

                      });

                      }, function(){
                      
                        
                        var modalInstance = $modal.open({
                        templateUrl: 'rejectContent.html',
                         controller: 'ModalInstancePlaylistCtrl',
                         size: 'sm',
                         resolve: {
                              items: function () {
                                
                                return $scope.selected ;
                                
                              }
                            }
                      
                        });
                  
                    });
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });        

    }
   

/***************************************************************************************************************/      
    $scope.spinner = true; 
    $scope.vue = true;  // show playlist form
    $scope.vue_audio = false;  // show playlist form
    $scope.vue2 = false; // show song of playlist
    $scope.so = {};      //  submit song to playlist
    $scope.so2 = {};      //  submit song to playlist
    $scope.playlist={};  // add playlist to table
    $scope.playlist.songs=[];  // add songs of one playlist
    $scope.playlists_songs = []; // add songs of playlist index
    $scope.users = User.query(); // get all user
   

  // show songs of playlist

    $scope.morePlaylist = function(index, playid){
       $scope.playlists_songs= $scope.playlists[index].songs;  //save the songs of current playlist index
       $scope.index= index;      // save index
       $scope.vue = false;
       $scope.vue2 = true;
       $scope.playlistId = playid;  //get playlist id
       $scope.songs = Song.query();  // get all song
       $scope.videos = Video.query(); // get all videos

    }

    // save song to playlist

    $scope.savePlaylist_song = function(data, songid){
      
      angular.extend(data, {songId: songid});
      angular.extend(data, {playlistId: $scope.playlistId});
      
         return saveSong2playlist.update({playlistId: $scope.playlistId, songId:songid }, data, function(){
           
           $scope.playlists= Playlist.query();
            var modalInstance = $modal.open({
            templateUrl: 'successContent.html',
             controller: 'ModalInstancePlaylistCtrl',
             size: 'sm',
             resolve: {
                  items: function () {
                    
                    return $scope.selected ;
                    
                  }
                }

            });
         }, function(){
                  $scope.playlists= Playlist.query();
                  var modalInstance = $modal.open({
                  templateUrl: 'rejectContent.html',
                   controller: 'ModalInstancePlaylistCtrl',
                   size: 'sm',
                   resolve: {
                        items: function () {
                          
                          return $scope.selected ;
                          
                        }
                      }
                
                  });
            
        });
    }

    // remove song to playlist

   
    // Back to Playlists

    $scope.showPlaylist = function(){

      $scope.vue2 = false;
      $scope.vue = true;
       
    }

    $scope.addPlaylist2song = function(){

        angular.extend($scope.so, {playlistid: $scope.playlistId});
       
        return Song2playlist.save(null, $scope.so, function(){
       

        $scope.playlists= Playlist.query(function(){
        $scope.playlists_songs= $scope.playlists[$scope.index].songs;        
        });
        
        var modalInstance = $modal.open({
        templateUrl: 'successContent.html',
         controller: 'ModalInstancePlaylistCtrl',
         size: 'sm',
         resolve: {
              items: function () {
                
                return $scope.selected ;
                
              }
            }

        });
        }, function(){

                $scope.playlists= Playlist.query();
                var modalInstance = $modal.open({
                templateUrl: 'rejectContent.html',
                 controller: 'ModalInstancePlaylistCtrl',
                 size: 'sm',
                 resolve: {
                      items: function () {
                        
                        return $scope.selected ;
                        
                      }
                    }
              
                });
           
        })

    }

     $scope.addPlaylist2video = function(){

      angular.extend($scope.so2, {playlistid: $scope.playlistId});
  
        return Song2playlist.save($scope.so2, function(){
        
        $scope.playlists= Playlist.query(function(){
        $scope.playlists_songs= $scope.playlists[$scope.index].songs;        
        });
        
        var modalInstance = $modal.open({
        templateUrl: 'successContent.html',
         controller: 'ModalInstancePlaylistCtrl',
         size: 'sm',
         resolve: {
              items: function () {
                
                return $scope.selected ;
                
              }
            }

        });
        
        }, function(){
                $scope.playlists= Playlist.query();
                var modalInstance = $modal.open({
                templateUrl: 'rejectContent.html',
                 controller: 'ModalInstancePlaylistCtrl',
                 size: 'sm',
                 resolve: {
                      items: function () {
                        
                        return $scope.selected ;
                        
                      }
                    }
              
                });
           
        })

    }

    // init playlist table
    $scope.initPlaylist = function(){
    $scope.playlists= Playlist.query(null, null, function(){
      $scope.spinner = false; 
    }, function(){
      $scope.spinner = false; 

    });
    }


    $scope.groups = [];
    
    // select group True or False
    $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('api/groups').success(function(data) {
        $scope.groups = data;
      });
    }

    $scope.loadGroupsUser = function() {
      return $scope.users.length ? null :  $scope.groupsUsers = $scope.users;
      
    }
    
      // update playlist
    $scope.savePlaylist = function(data, id) {
        console.log(data);
        angular.extend(data, {id: id});
       return Playlist.update({id: id}, data, function(){
         
         $scope.playlists= Playlist.query();
        var modalInstance = $modal.open({
        templateUrl: 'successContent.html',
         controller: 'ModalInstancePlaylistCtrl',
         size: 'sm',
         resolve: {
              items: function () {
                
                return $scope.selected ;
                
              }
            }

        });
       }, function(){
              $scope.playlists= Playlist.query();
              var modalInstance = $modal.open({
              templateUrl: 'rejectContent.html',
               controller: 'ModalInstancePlaylistCtrl',
               size: 'sm',
               resolve: {
                    items: function () {
                      
                      return $scope.selected ;
                      
                    }
                  }
            
              });
        
       });

    }

    
     // add Playlist
    $scope.addPlaylist = function() {
     
        return  Playlist.save($scope.pla, function(){
        $scope.pla = null;
        $scope.playlists= Playlist.query();
        var modalInstance = $modal.open({
        templateUrl: 'successContent.html',
         controller: 'ModalInstancePlaylistCtrl',
         size: 'sm',
         resolve: {
              items: function () {
                
                return $scope.selected ;
                
              }
            }

        });
        }, function(){
              $scope.playlists= Playlist.query();
              var modalInstance = $modal.open({
              templateUrl: 'rejectContent.html',
               controller: 'ModalInstancePlaylistCtrl',
               size: 'sm',
               resolve: {
                    items: function () {
                      
                      return $scope.selected ;
                      
                    }
                  }
            
              });
          
        });

  }

}]);
