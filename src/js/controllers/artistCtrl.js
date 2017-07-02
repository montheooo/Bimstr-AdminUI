app.controller('artistCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes', 'Artist', 
  function($scope, $filter, $http, editableOptions, editableThemes, Artist){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

    $scope.alerts = [];  // initialize alerts table
    $scope.artists =[];  // initialize artists table
    $scope.vue = true;   // show artists table

    $scope.addAlert = function() {
      $scope.alerts.push({type: 'success', msg: "Les informations ont été enregistrées"});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
      $scope.vue= true;
    };

    // init Artist Table
    $scope.initArtist = function(){

    $scope.artists= Artist.query();

    };

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
      //$scope.user not updated yet
      console.log(data);
      angular.extend(data, {id: id});
     return Artist.update({id: id}, data, function(){
       $scope.vue =false;
       $scope.alerts.push({type: 'success', msg: "Les informations ont été modifiées dans la base de données"});
     }, function(){
      alert("les donnees n'ont pas été modifiées dans la base");
     });

    };

     // remove Artist
    $scope.removeArtist = function(index, data) {
    
    $scope.artists.splice(index, 1);
    
    return Artist.delete({id: data}, null, function(){

       $scope.vue=false;
      $scope.alerts.push({type: 'danger', msg: "Les informations ont été suprimées de la base de données"});
      }, function(){
        alert("Les informations n'ont pas été suprimées de la base de données");
      });
           
    };
  
     // add Artist

    $scope.addArtist = function() {

      $scope.artists.push($scope.art);
      console.log($scope.artists);

    return  Artist.save(null, $scope.art, function(){

      $scope.vue=false;
      $scope.art=null;
      $scope.alerts.push({type: 'info', msg: "Les informations ont été ajoutées dans la base de données"});
      $scope.artists= Artist.query();
    }, function(){
      alert("Les informations n'ont pas été ajoutées à la base de données");
    });
       


    };

   

}]);
