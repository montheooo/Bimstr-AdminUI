app.controller('articleCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes', 'Article', 
  function($scope, $filter, $http, editableOptions, editableThemes, Article){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

    $scope.alerts = [];  // initialize alerts table
    $scope.articles =[];  // initialize articles table
    $scope.vue = true;   // show articles table

    $scope.addAlert = function() {
      $scope.alerts.push({type: 'success', msg: "Les informations ont été enregistrées"});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
      $scope.vue= true;
    };

    // init Article Table
    $scope.initArticle = function(){

    $scope.articles= Article.query();

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
      // update Article
    $scope.saveArticle = function(data, id) {
      //$scope.user not updated yet
      console.log(data);
      angular.extend(data, {id: id});
     return Article.update({id: id}, data, function(){
       $scope.vue =false;
       $scope.alerts.push({type: 'success', msg: "Les informations ont été modifiées dans la base de données"});
     }, function(){
      alert("les donnees n'ont pas été modifiées dans la base");
     });

    };

     // remove Article
    $scope.removeArticle = function(index, data) {
    
    $scope.articles.splice(index, 1);
    
    return Article.delete({id: data}, null, function(){

       $scope.vue=false;
      $scope.alerts.push({type: 'danger', msg: "Les informations ont été suprimées de la base de données"});
      }, function(){
        alert("Les informations n'ont pas été suprimées de la base de données");
      });
           
    };
  
     // add Article

    $scope.addArticle = function() {

      $scope.articles.push($scope.art);
      console.log($scope.articles);

    return  Article.save(null, $scope.art, function(){

      $scope.vue=false;
      $scope.art=null;
      $scope.alerts.push({type: 'info', msg: "Les informations ont été ajoutées dans la base de données"});
      $scope.articles= Article.query();
    }, function(){
      alert("Les informations n'ont pas été ajoutées à la base de données");
    });
       


    };

   

}]);
