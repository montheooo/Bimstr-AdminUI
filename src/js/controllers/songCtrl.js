app.controller('ModalInstanceSongCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
    $scope.items = items;
    console.log($scope.items);

    $scope.OK = function () {
      $modalInstance.close($scope.items);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };


  }]);

app.controller('songCtrl', ['$scope', '$filter', '$http','$modal', 'editableOptions', 'editableThemes', 'Album', 'Song','Artist',
  function($scope, $filter, $http, $modal, editableOptions, editableThemes, Album, Song, Artist){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

 $scope.selected ;
    $scope.open = function (song) {

          var modalInstance = $modal.open({
            templateUrl: 'deleteContent.html',
             controller: 'ModalInstanceSongCtrl',
             size: 'sm',
             resolve: {
              items: function () {
                $scope.selected = song ;
                return $scope.selected ;
                
              }
            }

          });

              console.log($scope.selected);

            modalInstance.result.then(function (selectedItem) {
                  $scope.select = selectedItem;
            
                  return Song.delete({id: $scope.select.id}, null, function(){
                   
                      $scope.songs= Song.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceSongCtrl',
                       size: 'sm',
                       resolve: {
                            items: function () {
                              
                              return $scope.selected ;
                              
                            }
                          }

                      });

                      }, function(){
                      
                        $scope.songs= Song.query();
                        var modalInstance = $modal.open({
                        templateUrl: 'rejectContent.html',
                         controller: 'ModalInstanceSongCtrl',
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
    
    $scope.songs =[];
    $scope.album = Album.query(); // get album for UI-select
    $scope.artist = Artist.query(); // get artist for UI-select
    $scope.vue = true;

    $scope.initSong = function(){

    $scope.songs= Song.query();

    };


    $scope.groups = [];
    $scope.groupsArtist = [];
    $scope.groupsAlbum = [];

    $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('api/groups').success(function(data) {
        $scope.groups = data;
      });
    };
    $scope.loadGroupsAlbum = function() {
      return $scope.groupsAlbum.length ? null : $scope.groupsAlbum=$scope.album;
        
     
    };

     $scope.loadGroupsArtist = function() {
      return $scope.groupsArtist.length ? null : $scope.groupsArtist=$scope.artist ;
        
     
    };
   
    $scope.checkName = function(data, id) {
      if (id === 100001 && data !== 'awesome') {
        return "Username 2 should be `awesome`";
      }
    };
      // save song
    $scope.saveSong = function(data, id) {
     
      console.log(data);
      angular.extend(data, {id: id});
     return Song.update({id: id}, data, function(){
       
        $scope.songs= Song.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceSongCtrl',
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
                         controller: 'ModalInstanceSongCtrl',
                         size: 'sm',
                         resolve: {
                              items: function () {
                                
                                return $scope.selected ;
                                
                              }
                            }
                      
                        });
     });

    };
  
     // add Song

    $scope.addSong = function() {
      $scope.songs.push($scope.tit);
      angular.extend($scope.tit, {id:$scope.songs.length+1});
      console.log($scope.tit);
    return  Song.save($scope.tit, function(){
      
      $scope.tit=null;
       $scope.songs= Song.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceSongCtrl',
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
                         controller: 'ModalInstanceSongCtrl',
                         size: 'sm',
                         resolve: {
                              items: function () {
                                
                                return $scope.selected ;
                                
                              }
                            }
                      
                        });
      });
    };

}]);
