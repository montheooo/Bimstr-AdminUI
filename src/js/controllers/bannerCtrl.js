app.controller('ModalInstanceBannerCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
    $scope.items = items;
    console.log($scope.items);

    $scope.OK = function () {
      $modalInstance.close($scope.items);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };


  }]);

app.controller('bannerCtrl', ['$scope', '$filter', '$http','$modal', 'editableOptions', 'editableThemes', 'Banner', 
  function($scope, $filter, $http, $modal, editableOptions, editableThemes, Banner){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

    $scope.selected ;
    $scope.select ;
    $scope.open = function (banner) {

          var modalInstance = $modal.open({
            templateUrl: 'deleteContent.html',
             controller: 'ModalInstanceBannerCtrl',
             size: 'sm',
             resolve: {
              items: function () {
                $scope.selected = banner ;
                return $scope.selected ;
                
              }
            }

          });

            modalInstance.result.then(function (selectedItem) {
                  $scope.select = selectedItem;
            
                  return Banner.delete({id: $scope.select.id}, null, function(){
                   
                      $scope.Banners= Banner.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceBannerCtrl',
                       size: 'sm',
                       resolve: {
                            items: function () {
                              
                              return $scope.selected ;
                              
                            }
                          }

                      });

                      }, function(){
                      
                       
                        var modalInstance = $modal.open({
                        templateUrl: 'rejectContent.html',
                         controller: 'ModalInstanceBannerCtrl',
                         size: 'sm',
                         resolve: {
                              items: function () {
                                
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
    $scope.Banners =[];   // initialise Banners table
    $scope.groupsBanner = [];  // initialise groups banner table
          // show banner table

  
    // init Banner
    $scope.initBanner = function(){
    $scope.Banners= Banner.query();
    };
    // True or False
    $scope.loadGroups = function() {
      
      return $scope.groupsBanner.length ? null : $http.get('api/groupsBanner').success(function(data) {
        $scope.groupsBanner = data;
      });
    };
   // check before update
    $scope.checkName = function(data, id) {
      if (id === 101 && data !== 'awesome') {
        return "Username 2 should be `awesome`";
      }
    };
      // save banner
    $scope.saveBanner = function(data, id) {      
      angular.extend(data, {id: id});
     return Banner.update({id: id}, data, function(){
        $scope.Banners= Banner.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceBannerCtrl',
                       size: 'sm',
                       resolve: {
                            items: function () {
                              
                              return $scope.selected ;
                              
                            }
                          }

                      });
     }, function(){
        var modalInstance = $modal.open({
                        templateUrl: 'rejectContent.html',
                         controller: 'ModalInstanceBannerCtrl',
                         size: 'sm',
                         resolve: {
                              items: function () {
                                
                                return $scope.selected ;
                                
                              }
                            }
                      
                        });
     });

    };

     // add Banner
    $scope.addBanner = function() {
      
      console.log($scope.Banners);
    return  Banner.save($scope.bann, function(){      
      $scope.bann=null;
      $scope.Banners= Banner.query();
                      var modalInstance = $modal.open({
                      templateUrl: 'successContent.html',
                       controller: 'ModalInstanceBannerCtrl',
                       size: 'sm',
                       resolve: {
                            items: function () {
                              
                              return $scope.selected ;
                              
                            }
                          }

                      });
    }, function(){
      var modalInstance = $modal.open({
                        templateUrl: 'rejectContent.html',
                         controller: 'ModalInstanceBannerCtrl',
                         size: 'sm',
                         resolve: {
                              items: function () {
                                
                                return $scope.selected ;
                                
                              }
                            }
                      
                        });
    });       
    };

}]);
