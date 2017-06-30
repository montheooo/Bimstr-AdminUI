app.controller('playlistCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes', 'Playlist', 
  function($scope, $filter, $http, editableOptions, editableThemes, Playlist, ){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

    $scope.alerts = [];
    
    
    $scope.vue = true;


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
