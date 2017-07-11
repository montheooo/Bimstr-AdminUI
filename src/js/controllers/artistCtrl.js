app.controller('ModalInstanceArtistCtrl', ['$scope', '$modalInstance', 'items','Artist', function($scope, $modalInstance, items, Artist) {
    $scope.items = items;
    console.log($scope.items);

    $scope.OK = function () {
      $modalInstance.close($scope.items);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

      // remove Artist
    $scope.removeArtist = function() {
    
    // $scope.artists.splice(index, 1);
        
        return Artist.delete({id: $scope.items.id}, null, function(){
         
          alert("Les informations ont été suprimées de la base de données");

          }, function(){
          
          alert("Les informations n'ont pas été suprimées de la base de données");

        });
               
    };

  }]);
  

app.controller('artistCtrl', ['$scope', '$filter', '$http', '$modal','$log','Artist', 
  function($scope, $filter, $http, $modal, $log, Artist){
    
     $scope.artists = [];
     $scope.selected ;

    $scope.open = function (artist) {

      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
         controller: 'ModalInstanceArtistCtrl',
         size: 'sm',
         resolve: {
          items: function () {
            $scope.selected = artist ;
            return $scope.selected ;
            
          }
        }

      });

      console.log($scope.selected);

     modalInstance.result.then(function (selectedItem) {
        $scope.select = selectedItem;
        console.log($scope.select);
        return Artist.delete({id: $scope.select.id}, null, function(){
         
          alert("Les informations ont été suprimées de la base de données");

          }, function(){
          
          alert("Les informations n'ont pas été suprimées de la base de données");

        });
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });        

    }
   
     
/*******************************************************************************************/
     // initialize artists table
   
    // init Artist Table

    $scope.initArtist = function(){

    return   $scope.artists = Artist.query();

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

         alert("Les informations ont été modifiées dans la base de données");

       }, function(){

         alert("les informations n'ont pas été modifiées dans la base de données");
       });

    };

   
  
     // add Artist

    $scope.addArtist = function() {

          $scope.artists.push($scope.art);

           return  Artist.save(null, $scope.art, function(){
     
          $scope.art=null;
          alert ("Les informations ont été ajoutées dans la base de données");
          

        }, function(){

          alert("Les informations n'ont pas été ajoutées à la base de données");

        });
           


    };

   

}]);
