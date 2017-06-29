app.controller('bannerCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes', 'Banner', 
  function($scope, $filter, $http, editableOptions, editableThemes, Banner){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

    $scope.alerts = [];
    $scope.Banners =[];
    $scope.groupsBanner = [];
    $scope.vue = true;

    $scope.addAlert = function() {
      $scope.alerts.push({type: 'success', msg: "Les informations ont été enregistrées"});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
      $scope.vue= true;
    };

    $scope.initBanner = function(){

    $scope.Banners= Banner.query();

    };


   
    $scope.loadGroups = function() {
      
      return $scope.groupsBanner.length ? null : $http.get('api/groupsBanner').success(function(data) {
        $scope.groupsBanner = data;
      });
    };
   
    $scope.checkName = function(data, id) {
      if (id === 101 && data !== 'awesome') {
        return "Username 2 should be `awesome`";
      }
    };
      //
    $scope.saveBanner = function(data, id) {
      //$scope.user not updated yet
      
      angular.extend(data, {id: id});
     return Banner.update({id: id}, data, function(){
       $scope.vue =false;
       $scope.alerts.push({type: 'success', msg: "Les informations ont été modifiées dans la base de données"});
     });

    };

     // remove Artist
    $scope.removeBanner = function(index, data) {
    
    $scope.Banners.splice(index, 1);
    
    return Banner.delete({id: data}, null, function(){

       $scope.vue=false;
      $scope.alerts.push({type: 'danger', msg: "Les informations ont été suprimées de la base de données"});
      

      });
           
    };
  
     // add Artist

    $scope.addBanner = function() {

      $scope.Banners.push($scope.bann);
      console.log($scope.Banners);

    return  Banner.save($scope.bann, function(){

      $scope.vue=false;
      $scope.bann=null;
      $scope.alerts.push({type: 'info', msg: "Les informations ont été ajoutées dans la base de données"});
      $scope.Banners= Banner.query();
      


    });
       


    };

   

}]);
