app.controller('ModalInstanceArtistCtrl', ['$scope', '$modalInstance', 'items','Artist', function($scope, $modalInstance, items, Artist) {
    $scope.items = items;
    console.log($scope.items);

    $scope.OK = function () {
      $modalInstance.close($scope.items);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };


  }]);
  

app.controller('artistCtrl', ['$scope', '$filter', '$http', '$modal','$log','Artist', 
  function($scope, $filter, $http, $modal, $log, Artist){
    
$scope.selected ;
    $scope.open = function (album) {

          var modalInstance = $modal.open({
            templateUrl: 'deleteContent.html',
             controller: 'ModalInstanceArtistCtrl',
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
            
                  return Artist.delete({id: $scope.select.id}, null, function(){
                   
                      $scope.artists= Artist.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceArtistCtrl',
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
                         controller: 'ModalInstanceArtistCtrl',
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


     $scope.artists = [];   
    // init Artist Table
    $scope.spinner = true ;
    $scope.initArtist = function(){

    return   $scope.artists = Artist.query(null, null, function(){
          $scope.spinner = false ;
    }, function(){
          $scope.spinner = false ;
    });

    }

    // select "True" or "False"    
    $scope.groups = [];
    $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('api/groups').success(function(data) {
        $scope.groups = data;
      });
    };

   // check before update
    $scope.checkName = function(data, id) {
      if (id === 101 && data !== 'awesome') {
        return "Username 2 should be `awesome`";
      }
    };

    // update Artist
    $scope.saveArtist = function(data, id) {
     
      angular.extend(data, {id: id});
     return Artist.update({id: id}, data, function(){  

          $scope.artists= Artist.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceArtistCtrl',
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
                         controller: 'ModalInstanceArtistCtrl',
                         size: 'sm',
                         resolve: {
                              items: function () {
                                
                                return $scope.selected ;
                                
                              }
                            }
                      
                        });
       });

    };

   
  
     // add Artist

    $scope.addArtist = function() {

           return  Artist.save(null, $scope.art, function(){
     
          $scope.art=null;
           $scope.artists= Artist.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceArtistCtrl',
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
                         controller: 'ModalInstanceArtistCtrl',
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
