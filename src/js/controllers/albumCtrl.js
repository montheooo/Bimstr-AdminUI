app.controller('albumCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes', 'Album', 'Artist',
  function($scope, $filter, $http, editableOptions, editableThemes, Album, Artist){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

    $scope.alerts = [];
    $scope.albums =[];
    $scope.artist = Artist.query();
    $scope.vue = true;
    $scope.alb = {};
    $scope.albums_songs=[];

    $scope.disabled = undefined;
    $scope.searchEnabled = undefined;


    $scope.moreAlbum_song = function(index, album){

      $scope.albums_songs= $scope.albums[index].song;
       $scope.vue = false;
       $scope.vue2 = true;
       $scope.albumId = album;
     //  $scope.songs = Song.query();
       console.log($scope.albums_songs);
     //  console.log($scope.playlistId);


    }

     $scope.showAlbum = function(){

      $scope.vue2 = false;
      $scope.vue = true;
       
    }
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

    $scope.initAlbum = function(){

    $scope.albums= Album.query(null,null,function(){

      console.log($scope.albums);

    });
    

    };


    $scope.groups = [];
    $scope.groupsAlbum = [];

    $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('api/groups').success(function(data) {
        $scope.groups = data;
      });
    };
    $scope.loadGroupsAlbum = function() {
      return $scope.groupsAlbum.length ? null : Artist.query(null,null,function(data) {
        $scope.groupsAlbum = data;
      });
    };
   
    $scope.checkName = function(data, id) {
      if (id === 100001 && data !== 'awesome') {
        return "Username 2 should be `awesome`";
      }
    };
      //
    $scope.saveAlbum = function(data, id) {
      //$scope.user not updated yet
      console.log(data);
      angular.extend(data, {id: id});
     return Album.update({id: id}, data, function(){
       $scope.vue =false;
       $scope.alerts.push({type: 'success', msg: "Les informations ont été modifiées dans la base de données"});
     });

    };

     // remove Album
    $scope.removeAlbum = function(index, data) {
    
    $scope.albums.splice(index, 1);
    
    return Album.delete({id: data}, null, function(){

       $scope.vue=false;
      $scope.alerts.push({type: 'danger', msg: "Les informations ont été suprimées de la base de données"});
      

      });
           
    };
  
     // add Album

    $scope.addAlbum = function() {

      $scope.albums.push($scope.alb);
      angular.extend($scope.alb, {id:$scope.albums.length+1});
      console.log($scope.alb);

    return  Album.save({}, $scope.alb, function(){

      $scope.vue=false;
      $scope.alb=null;
      $scope.alerts.push({type: 'info', msg: "Les informations ont été ajoutées dans la base de données"});
      $scope.albums= Album.query();
      


    });
       


    };

   

}]);
