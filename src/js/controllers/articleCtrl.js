app.controller('ModalInstanceArticleCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
    $scope.items = items;
    console.log($scope.items);

    $scope.OK = function () {
      $modalInstance.close($scope.items);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };


  }]);

app.controller('articleCtrl', ['$scope', '$filter', '$http', '$modal', 'editableOptions', 'editableThemes', 'Article', 
  function($scope, $filter, $http, $modal, editableOptions, editableThemes, Article){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
    $scope.selected ;
    $scope.open = function (album) {

          var modalInstance = $modal.open({
            templateUrl: 'deleteContent.html',
             controller: 'ModalInstanceArticleCtrl',
             size: 'sm',
             resolve: {
              items: function () {
                $scope.selected = album ;
                return $scope.selected ;
                
              }
            }

          });

            modalInstance.result.then(function (selectedItem) {
                  $scope.select = selectedItem;
            
                  return Article.delete({id: $scope.select.id}, null, function(data){
                   
                      $scope.articles= Article.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceArticleCtrl',
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
                         controller: 'ModalInstanceArticleCtrl',
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
/**************************************************************************************/  
    $scope.spinner = true; 
    $scope.articles =[];  // initialize articles table
    $scope.vue = true;   // show articles table

    // init Article Table
    $scope.initArticle = function(){

    $scope.articles= Article.query(null, null, function(){
      $scope.spinner = false;

    }, function(){

      $scope.spinner = false;
    });

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
     return Article.update({id: id}, data, function(data){
       $scope.articles= Article.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceArticleCtrl',
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
                         controller: 'ModalInstanceArticleCtrl',
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
 
     // add Article

    $scope.addArticle = function() {

      console.log($scope.articles);

    return  Article.save(null, $scope.art, function(data){

      
      $scope.art=null;
      $scope.articles= Article.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceArticleCtrl',
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
                         controller: 'ModalInstanceArticleCtrl',
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
