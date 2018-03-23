app.controller('ModalInstanceBeatCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
    $scope.items = items;
    console.log($scope.items);

    $scope.OK = function () {
      $modalInstance.close($scope.items);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };


  }]);

app.controller('beatCtrl', ['$scope', '$filter', '$http','$modal', 'editableOptions', 'editableThemes', 'Album', 'Beat','Artist',
  function($scope, $filter, $http, $modal, editableOptions, editableThemes, Album, Beat, Artist){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

 $scope.selected ;
    $scope.open = function (beat) {

          var modalInstance = $modal.open({
            templateUrl: 'deleteContent.html',
             controller: 'ModalInstanceBeatCtrl',
             size: 'sm',
             resolve: {
              items: function () {
                $scope.selected = beat ;
                return $scope.selected ;
                
              }
            }

          });

              console.log($scope.selected);

            modalInstance.result.then(function (selectedItem) {
                  $scope.select = selectedItem;
            
                  return Beat.delete({id: $scope.select.id}, null, function(data){
                   
                      $scope.beats= Beat.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceBeatCtrl',
                       size: 'sm',
                       resolve: {
                            items: function () {
                              $scope.selected = data ;
                              return $scope.selected ;
                              
                            }
                          }

                      });

                      }, function(data){
                      
                        $scope.beats= Beat.query();
                        var modalInstance = $modal.open({
                        templateUrl: 'rejectContent.html',
                         controller: 'ModalInstanceBeatCtrl',
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
   

/***************************************************************************************************************/      
    $scope.spinner= true;
    $scope.beats =[];
    $scope.album = Album.query(); // get album for UI-select
    $scope.artist = Artist.query(); // get artist for UI-select
    $scope.vue = true;

    $scope.initBeat = function(){

      $scope.beats= Beat.query(null, null, function(){
        $scope.spinner= false;
      }, function(){
        $scope.spinner= false;

      });

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
      // save beat
    $scope.saveBeat = function(data, id) {
     
      console.log(data);
      angular.extend(data, {id: id});
     return Beat.update({id: id}, data, function(data){
       
        $scope.beats= Beat.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceBeatCtrl',
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
                         controller: 'ModalInstanceBeatCtrl',
                         size: 'sm',
                         resolve: {
                              items: function () {
                                $scope.selected = data ;
                                return $scope.selected ;
                                
                              }
                            }
                      
                        });
     });

    };
  
     // add Beat

    $scope.addBeat = function() {
      $scope.beats.push($scope.tit);
      angular.extend($scope.tit, {id:$scope.beats.length+1});
      console.log($scope.tit);
    return  Beat.save($scope.tit, function(data){
      
      $scope.tit=null;
       $scope.beats= Beat.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceBeatCtrl',
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
                         controller: 'ModalInstanceBeatCtrl',
                         size: 'sm',
                         resolve: {
                              items: function () {
                                $scope.selected = data ;
                                return $scope.selected ;
                                
                              }
                            }
                      
                        });
      });
    };

}]);
