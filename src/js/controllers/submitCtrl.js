app.controller('ModalInstanceBeatCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
    $scope.items = items;
    console.log($scope.items);

    $scope.OK = function () {
      $modalInstance.close($scope.items);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };


}]);

app.controller('submitCtrl', ['$scope', '$filter', '$http','$modal','$log', 'editableOptions', 'editableThemes', 'Submit', 'Validation',
  function($scope, $filter, $http, $modal, $log, editableOptions, editableThemes, Submit, Validation){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

    $scope.selected ;
    $scope.open = function (submit) {

          var modalInstance = $modal.open({
            templateUrl: 'deleteContent.html',
             controller: 'ModalInstanceBeatCtrl',
             size: 'sm',
             resolve: {
              items: function () {
                $scope.selected = submit ;
                return $scope.selected ;
                
              }
            }

          });

              console.log($scope.selected);

            modalInstance.result.then(function (selectedItem) {
                  $scope.select = selectedItem;
            
                  return Submit.delete({id: $scope.select.id}, null, function(data){
                   
                      $scope.submits= Submit.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceBeatCtrl',
                       size: 'sm',
                       resolve: {
                            items: function () {
                              $scope.selected = data ;
                              return $scope.selected ;
                              
                            }
                          }

                      });

                      }, function(data){
                      
                        $scope.submits= Submit.query();
                        var modalInstance = $modal.open({
                        templateUrl: 'rejectContent.html',
                         controller: 'ModalInstanceBeatCtrl',
                         size: 'sm',
                         resolve: {
                              items: function () {
                                $scope.selected = data ;
                                return $scope.selected ;
                                
                              }
                            }
                      
                        });
                  
                    });
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });        

    }
   

 /***************************************************************************************************************/      
    $scope.spinner= true;
    $scope.submits =[];
   
    $scope.vue = true;

    $scope.initSubmit = function(){

      $scope.submits= Submit.query(null, null, function(){
        $scope.spinner= false;
      }, function(){
        $scope.spinner= false;

      });

    };
   
    $scope.checkName = function(data, id) {
      if (id === 100001 && data !== 'awesome') {
        return "Username 2 should be `awesome`";
      }
    };
      // save Submit
    $scope.saveSubmit = function(data, id) {
     
      console.log(data);
      angular.extend(data, {id: id});
     return Submit.update({id: id}, data, function(data){
       
        $scope.submits= Submit.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceBeatCtrl',
                       size: 'sm',
                       resolve: {
                            items: function () {
                              $scope.selected = data ;
                              return $scope.selected ;
                              
                            }
                          }

                      });
     }, function(data){
        var modalInstance = $modal.open({
                        templateUrl: 'rejectContent.html',
                         controller: 'ModalInstanceBeatCtrl',
                         size: 'sm',
                         resolve: {
                              items: function () {
                                $scope.selected = data ;
                                return $scope.selected ;
                                
                              }
                            }
                      
                        });
     });

    };

    

       // validation Submit
    $scope.valider = function (id) {

      console.log(id);
     
     /*  var data = {

          "beatMaker": true,
          "producer": true,
          "stylist": true,
          "designer": true,
          "singer": true
        } */

     return Validation.save({id: id}, null, function(data){
       
        $scope.submits= Submit.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceBeatCtrl',
                       size: 'sm',
                       resolve: {
                            items: function () {
                              $scope.selected = data ;
                              return $scope.selected ;
                              
                            }
                          }

                      });
     }, function(data){
        var modalInstance = $modal.open({
                        templateUrl: 'rejectContent.html',
                         controller: 'ModalInstanceBeatCtrl',
                         size: 'sm',
                         resolve: {
                              items: function () {
                                $scope.selected = data ;
                                return $scope.selected ;
                                
                              }
                            }
                      
                        });
     });

    };
  
     
}]);
