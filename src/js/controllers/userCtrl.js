app.controller('ModalInstanceUserCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
    $scope.items = items;
    console.log($scope.items);

    $scope.OK = function () {
      $modalInstance.close($scope.items);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };


  }]);



app.controller('userCtrl', ['$scope', '$filter', '$http', '$modal','editableOptions', 'editableThemes', 'Playlist', 'Song','User',
  function($scope, $filter, $http, $modal, editableOptions, editableThemes, Playlist, Song, User,){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

    $scope.selected ;
    $scope.open = function (user) {

          var modalInstance = $modal.open({
            templateUrl: 'deleteContent.html',
             controller: 'ModalInstanceUserCtrl',
             size: 'sm',
             resolve: {
              items: function () {
                $scope.selected = user ;
                return $scope.selected ;
                
              }
            }

          });

            modalInstance.result.then(function (selectedItem) {
                  $scope.select = selectedItem;
            
                  return User.delete({id: $scope.select.id}, null, function(data){
                   
                      $scope.users= User.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceUserCtrl',
                       size: 'sm',
                       resolve: {
                            items: function () {
                              $scope.selected = data ;
                              return $scope.selected ;
                              
                            }
                          }

                      });

                      }, function(data){
                      
                       
                        var modalInstance = $modal.open({
                        templateUrl: 'rejectContent.html',
                         controller: 'ModalInstanceUserCtrl',
                         size: 'sm',
                         resolve: {
                              items: function () {
                                $scope.selected = data ;
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
    $scope.vue = true;  // show user form  
    $scope.vue2 = false; // show social_profile of user
    $scope.vue3= false;  // show playlists of user
    $scope.user={};  // add user to table
   
    $scope.social_profile = []; // add socialProfiles of user index
    $scope.user_playlist = []; // add socialProfiles of user index
    $scope.user_song = []; // add songs of user index
    $scope.pla={};

  // show socialProfiles of user

    $scope.moreUser = function(index, playid){
       $scope.social_profile= $scope.users[index].socialProfiles;  //save the socialProfiles of current user index
       $scope.index= index;      // save user index
       $scope.vue = false;
       $scope.vue2 = true;
       $scope.vue3 = false;
       $scope.vue4 = false;
       $scope.userId = playid;  //get user id
       
      

    }

    // Show Playlists of user

$scope.morePlaylist = function(){

       $scope.user_playlist= $scope.users[$scope.index].playlist;  //save the playlist of current user index
      
       $scope.vue = false;
       $scope.vue2 = false;
       $scope.vue3 = true;
       $scope.vue4 = false;
       console.log($scope.user_playlist);
    }
   
   // Show songs of playlist
  $scope.moreSong = function(index){

       $scope.user_song= $scope.users[$scope.index].playlist[index].songs;  //save the playlist of current user index
      
       $scope.vue = false;
       $scope.vue2 = false;
       $scope.vue3 = false;
       $scope.vue4 = true;
       console.log($scope.user_song);

    } 
    // Back to users

    $scope.showUser = function(){

      $scope.vue2 = false;
      $scope.vue = true;
      $scope.vue3 = false;
      $scope.vue4 = false;
       
    }

   

    // init user table
    $scope.initUser = function(){
    $scope.users = User.query(null, null, function(){
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
    
      // update user
    $scope.saveUser = function(data, id) {
        console.log(data);
        angular.extend(data, {id: id});
       return User.update({id: id}, data, function(data){
         
         $scope.users= User.query();
        var modalInstance = $modal.open({
        templateUrl: 'successContent.html',
         controller: 'ModalInstanceUserCtrl',
         size: 'sm',
         resolve: {
              items: function () {
                $scope.selected = data ;
                return $scope.selected ;
                
              }
            }

        });
       }, function(data){
              $scope.users= User.query();
              var modalInstance = $modal.open({
              templateUrl: 'rejectContent.html',
               controller: 'ModalInstanceUserCtrl',
               size: 'sm',
               resolve: {
                    items: function () {
                      $scope.selected = data ;
                      return $scope.selected ;
                      
                    }
                  }
            
              });
        
       });

    }

    
     // add User
    $scope.addUser = function() {
      angular.extend($scope.pla, {user: 
      {emailAddress:$scope.pla.emailAddress}});
        return  User.save($scope.pla, function(data){
        $scope.pla = null;
        $scope.users= User.query();
        var modalInstance = $modal.open({
        templateUrl: 'successContent.html',
         controller: 'ModalInstanceUserCtrl',
         size: 'sm',
         resolve: {
              items: function () {
                $scope.selected = data ;
                return $scope.selected ;
                
              }
            }

        });
        }, function(data){
              
              var modalInstance = $modal.open({
              templateUrl: 'rejectContent.html',
               controller: 'ModalInstanceUserCtrl',
               size: 'sm',
               resolve: {
                    items: function () {
                      $scope.selected = data ;
                      return $scope.selected ;
                      
                    }
                  }
            
              });
          
        });

  }
 
}])
     