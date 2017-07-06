app.controller('userCtrl', ['$scope', '$filter', '$http', '$facebook','editableOptions', 'editableThemes', 'Playlist', 'Song','User','Artist',
  function($scope, $filter, $http, $facebook, editableOptions, editableThemes, Playlist, Song, User,Artist){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

    $scope.isLoggedIn = false;
  $scope.login = function() {
    $facebook.login().then(function() {
      refresh();
    });
  }
  function refresh() {
    $facebook.api("/me").then( 
      function(response) {
        $scope.welcomeMsg = "Welcome " + response.name;
        $scope.isLoggedIn = true;
      },
      function(err) {
        $scope.welcomeMsg = "Please log in";
      });
  }
  
  refresh();

    $scope.alerts = [];  // initialize alerts 
    $scope.albums =[];   // initialise Albums
    $scope.artist = Artist.query();  // initialise Artist
    $scope.vue = true;  // show song table
    $scope.alb = {};   // initialise submit song object
    $scope.albums_songs=[]; // initialise songs table for album

    $scope.disabled = undefined;
    $scope.searchEnabled = undefined;

    // show songs for album
    $scope.moreAlbum_song = function(index, album){

      $scope.albums_songs= $scope.albums[index].song;
       $scope.vue = false;
       $scope.vue2 = true;
       $scope.albumId = album;
       console.log($scope.albums_songs);
       }
    // show album table
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

    // initialize album table
    $scope.initAlbum = function(){
    $scope.albums= Album.query(null,null,function(){
      console.log($scope.albums);
    });
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

}])
      // update Album
/*    $scope.saveAlbum = function(data, id) {
     
      console.log(data);
      angular.extend(data, {id: id});
     return Album.update({id: id}, data, function(){
       $scope.vue =false;
       $scope.alerts.push({type: 'success', msg: "Les informations ont été modifiées dans la base de données"});
     }, function(){
*/