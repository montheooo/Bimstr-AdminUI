app.controller('ModalInstanceAlbumCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
    $scope.items = items;
    console.log($scope.items);

    $scope.OK = function () {
      $modalInstance.close($scope.items);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };


  }]);

app.controller('albumCtrl', ['$scope', '$filter', '$http','$modal', 'editableOptions', 'editableThemes', 'Album', 'Artist',
  function($scope, $filter, $http,$modal, editableOptions, editableThemes, Album, Artist){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

  $scope.selected ;
    $scope.open = function (album) {

          var modalInstance = $modal.open({
            templateUrl: 'deleteContent.html',
             controller: 'ModalInstanceAlbumCtrl',
             size: 'sm',
             resolve: {
              items: function () {
                $scope.selected = album ;
                return $scope.selected ;
                
              }
            }

          });

            modalInstance.result.then(function (selectedItem) {
                  $scope.select = selectedItem;
            
                  return Album.delete({id: $scope.select.id}, null, function(){
                   
                      $scope.albums= Album.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceAlbumCtrl',
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
                         controller: 'ModalInstanceAlbumCtrl',
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
/**************************************************************************************/
 
    $scope.albums =[];   // initialise Albums
    $scope.artist = Artist.query();  // initialise Artist
    $scope.vue = true;  // show song table
    $scope.alb = {};   // initialise submit song object
    $scope.albums_songs=[]; // initialise songs table for album

    $scope.disabled = undefined;
    $scope.searchEnabled = undefined;

    // show songs for album
    $scope.moreAlbum_song = function(index, album){
      $scope.vue2 = true;
      $scope.vue = false;
      $scope.albums_songs= $scope.albums[index].song;
       
       $scope.albumId = album;
       console.log($scope.albums_songs);
    }
    // show album table
     $scope.showAlbum = function(){

      $scope.vue2 = false;
      $scope.vue = true;
       
    }

    // initialize album table
    $scope.initAlbum = function(){

      $scope.albums= Album.query();    
    };


    $scope.groups = [];
    $scope.groupsAlbum = [];

     // show True or False
    $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('api/groups').success(function(data) {
        $scope.groups = data;
      });
    };

    // show artist list
    $scope.loadGroupsAlbum = function() {
      return $scope.groupsAlbum.length ? null : $scope.groupsAlbum=$scope.artist;
    //    $scope.groupsAlbum = data;
      
    };
   // check name before Submit
    $scope.checkName = function(data, id) {
      if (id === 100001 && data !== 'awesome') {
        return "Username 2 should be `awesome`";
      }
    };
      // update Album
    $scope.saveAlbum = function(data, id) {
     
      console.log(data);
      angular.extend(data, {id: id});
     return Album.update({id: id}, data, function(){
       
       $scope.albums= Album.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceAlbumCtrl',
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
                         controller: 'ModalInstanceAlbumCtrl',
                         size: 'sm',
                         resolve: {
                              items: function () {
                                
                                return $scope.selected ;
                                
                              }
                            }
                      
                        });
     });

    };

   
     // add Album
    $scope.addAlbum = function() {
      $scope.albums.push($scope.alb);
      angular.extend($scope.alb, {id:$scope.albums.length+1});
      console.log($scope.alb);
    return  Album.save({}, $scope.alb, function(){
      
      $scope.alb=null;
      $scope.albums= Album.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceAlbumCtrl',
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
                         controller: 'ModalInstanceAlbumCtrl',
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
