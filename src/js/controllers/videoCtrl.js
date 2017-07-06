app.controller('videoCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes', 'Album', 'Song','Artist','Video',
  function($scope, $filter, $http, editableOptions, editableThemes, Album, Song, Artist, Video){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

    $scope.alerts = [];
    $scope.videos =[];
    $scope.album = Album.query(); // get album for UI-select
    $scope.artist = Artist.query(); // get artist for UI-select
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

    $scope.initVideo = function(){

    $scope.videos= Video.query();

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
       $scope.vue =false;
       $scope.alerts.push({type: 'success', msg: "Les informations ont été modifiées dans la base de données"});
     }, function(){
      alert("les informations n'ont pas été modifiées dans la base de données");
     });

    };

     // remove Video
    $scope.removeVideo = function(index, data) {    
    $scope.videos.splice(index, 1);    
    return Video.delete({id: data}, null, function(){
       $scope.vue=false;
       $scope.alerts.push({type: 'danger', msg: "Les informations ont été suprimées de la base de données"});
      }, function(){
        alert("les informations n'ont pas été supprimées dans la base");
      });
           
    };
  
     // add Video

    $scope.addVideo = function() {
      $scope.videos.push($scope.tit);
      angular.extend($scope.tit, {id:$scope.videos.length+1});
      console.log($scope.tit);
    return  Video.save($scope.tit, function(){
      $scope.vue=false;
      $scope.tit=null;
      $scope.alerts.push({type: 'info', msg: "Les informations ont été ajoutées dans la base de données"});
      $scope.videos= Video.query();
    }, function(){
      alert("les informations n'ont pas été ajoutées à la base de données");
    });
    };

}]);
