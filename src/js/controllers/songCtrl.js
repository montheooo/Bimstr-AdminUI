app.controller('songCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes', 'Album', 'Song',
  function($scope, $filter, $http, editableOptions, editableThemes, Album, Song){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

    $scope.alerts = [];
    $scope.songs =[];
    $scope.album = Album.query(); // get album for UI-select
    $scope.vue = true;

    $scope.disabled = undefined;
    $scope.searchEnabled = undefined;

        $scope.enable = function() {
        $scope.disabled = false;
        };

        $scope.disable = function() {
        $scope.disabled = true;
        };

        $scope.enableSearch = function() {
        $scope.searchEnabled = true;
        }

        $scope.disableSearch = function() {
        $scope.searchEnabled = false;
        }


    $scope.addAlert = function() {
      $scope.alerts.push({type: 'success', msg: "Les informations ont été enregistrées"});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
      $scope.vue= true;
    };

    $scope.initSong = function(){

    $scope.songs= Song.query();

    };


    $scope.groups = [];
    $scope.groupsAlbum = [];

    $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('api/groups').success(function(data) {
        $scope.groups = data;
      });
    };
    $scope.loadGroupsAlbum = function() {
      return $scope.groupsAlbum.length ? null : Album.query(null,null,function(data) {
        $scope.groupsAlbum = data;
      });
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
       $scope.vue =false;
       $scope.alerts.push({type: 'success', msg: "Les informations ont été modifiées dans la base de données"});
     }, function(){
      alert("les informations n'ont pas été modifiées dans la base de données");
     });

    };

     // remove Song
    $scope.removeSong = function(index, data) {    
    $scope.songs.splice(index, 1);    
    return Song.delete({id: data}, null, function(){
       $scope.vue=false;
       $scope.alerts.push({type: 'danger', msg: "Les informations ont été suprimées de la base de données"});
      }, function(){
        alert("les informations n'ont pas été supprimées dans la base");
      });
           
    };
  
     // add Song

    $scope.addSong = function() {
      $scope.songs.push($scope.tit);
      angular.extend($scope.tit, {id:$scope.songs.length+1});
      console.log($scope.tit);
    return  Song.save($scope.tit, function(){
      $scope.vue=false;
      $scope.tit=null;
      $scope.alerts.push({type: 'info', msg: "Les informations ont été ajoutées dans la base de données"});
      $scope.songs= Song.query();
    }, function(){
      alert("les informations n'ont pas été ajoutées à la base de données");
    });
    };

}]);
