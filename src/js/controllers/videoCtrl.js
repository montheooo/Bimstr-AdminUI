app.controller('ModalInstanceVideoCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
    $scope.items = items;
    console.log($scope.items);

    $scope.OK = function () {
      $modalInstance.close($scope.items);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };


  }]);


app.controller('videoCtrl', ['$scope', '$filter', '$http','$modal', 'editableOptions', 'editableThemes', 'Album', 'Song','Artist','Video',
  function($scope, $filter, $http,$modal, editableOptions, editableThemes, Album, Song, Artist, Video){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
    $scope.selected ;
   
    $scope.open = function (video) {

          var modalInstance = $modal.open({
            templateUrl: 'deleteContent.html',
             controller: 'ModalInstanceVideoCtrl',
             size: 'sm',
             resolve: {
              items: function () {
                $scope.selected = video ;
                return $scope.selected ;
                
              }
            }

          });

            modalInstance.result.then(function (selectedItem) {
                  $scope.select = selectedItem;
            
                  return Video.delete({id: $scope.select.id}, null, function(){
                   
                      $scope.videos= Video.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceVideoCtrl',
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
                         controller: 'ModalInstanceVideoCtrl',
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
    $scope.spinner = true;
    $scope.videos =[];
    $scope.album = Album.query(); // get album for UI-select
    $scope.artist = Artist.query(); // get artist for UI-select
    $scope.vue = true;

    $scope.initVideo = function(){

    $scope.videos= Video.query(null, null, function(){
        $scope.spinner = false;
      }, function(){
        $scope.spinner = false;

      });

    };


    $scope.groups = [];
    $scope.groupsAlbum = [];
    $scope.groupsArtist = [];

    $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('api/groups').success(function(data) {
        $scope.groups = data;
      });
    };

    $scope.loadGroupsAlbum = function() {
      return $scope.groupsAlbum.length ? null :  $scope.groupsAlbum = $scope.album;
       
     
    };
   $scope.loadGroupsArtist = function() {
      return $scope.groupsArtist.length ? null : $scope.groupsArtist = $scope.artist;
        
      
    };
    $scope.checkName = function(data, id) {
      if (id === 100001 && data !== 'awesome') {
        return "Username 2 should be `awesome`";
      }
    };
      // save song
    $scope.saveVideo = function(data, id) {
     
      console.log(data);
      angular.extend(data, {id: id});
     return Video.update({id: id}, data, function(){
       $scope.videos= Video.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceVideoCtrl',
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
                         controller: 'ModalInstanceVideoCtrl',
                         size: 'sm',
                         resolve: {
                              items: function () {
                                
                                return $scope.selected ;
                                
                              }
                            }
                      
                        });
     });

    };
  
     // add Video

    $scope.addVideo = function() {
      $scope.videos.push($scope.tit);
      angular.extend($scope.tit, {id:$scope.videos.length+1});
      console.log($scope.tit);
    return  Video.save($scope.tit, function(){
      
      $scope.tit=null;
      $scope.videos= Video.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceVideoCtrl',
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
                         controller: 'ModalInstanceVideoCtrl',
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
