app.controller('UsersListCtrl', function($scope, $http, $filter, editableOptions, editableThemes, Users) {
  $scope.admin = [];
  $scope.editor = [];
  $scope.user = {};
  $scope.userLastPage = 1;
  $scope.userMaxPage = 0;
  //  pagination
  $scope.itemsByPage=10;

  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';

  $scope.userStatuses = [
      'admin', 'editor'
  ];
  
  $scope.showStatus = function(user) {
      var selected = $filter('filter')($scope.userStatuses, user.status);
      return (user.status && selected.length) ? selected[0] : 'Not set';
    };

  $scope.getAdminUsers = function() {

    if ($scope.admin.length === 0) {
      $scope.admin = $scope.refreshList("admin");
    }  
    $scope.displayed = $scope.admin;
    return $scope.admin;
  }

  $scope.getEditorUsers = function() {
    $scope.displayed = [];
    if ($scope.editor.length === 0) {
      return $scope.editor = $scope.refreshList("editor");
    }
    $scope.displayed = $scope.editor;  
    return $scope.editor;
  }

  $scope.getAllUsers = function(page) {

    if (page === 0) {
      page = $scope.userLastPage;
    }

    if (! $scope.user.hasOwnProperty(page)) {
      $scope.user[page] = $scope.refreshUserList("user", page);
    }
    $scope.displayed = $scope.user[page];  
    return $scope.user[page]; 
  }

  $scope.refreshUserList = function(a_role, a_start,  a_nbEntries) {
    return Users.getUserPagination({'role': a_role, 'entries': a_nbEntries, 'start':a_start});
  }

  $scope.refreshList = function(a_role) {
    return Users.query({role: a_role});
  }

  $scope.getAdminUsers();

   $scope.getUsers = function(status) {

    if (status=="admin") {
      return $scope.getAdminUsers();
    }

    else if (status=="editor") {
      return $scope.getEditorUsers();
    }

    else {
      return $scope.getAllUsers($scope.userLastPage);
    }
  }

  $scope.rowCollection = [];
  $scope.displayedCollection = [].concat($scope.rowCollection);

  $scope.displayed = [];

  //  pagination
  $scope.itemsByPage=10;

  $scope.callServer = function callServer(tableState) {

    $scope.isLoading = true;

    var pagination = tableState.pagination;

    var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
    var number = pagination.number || 10;  // Number of entries showed per page.

    $scope.refreshUserList("user", start, number).$promise.then(function(result) {
      $scope.rowCollection = result.data;
      tableState.pagination.number = 10,
      tableState.pagination.start = 1;
      tableState.pagination.numberOfPages = result.numberOfPages;//set the number of pages so the pagination can update
      $scope.isLoading = false;
    })

  }


  // add user
  $scope.addUser = function(status) {
    $scope.inserted = {
      name: '',
      lastname: '',
      username:'',
      email:'',
      status: null
    };
    if (status=="admin") {
      $scope.admin.push($scope.inserted);
    }

    else if (status=="editor") {
      $scope.editor.push($scope.inserted);
    }

    else {
      $scope.user[$scope.userLastPage].push($scope.inserted);
    }
    
  };

  $scope.saveUser = function(data, id) {
      //$scope.user not updated yet
      console.log($scope.admin);
      console.log(data);
      console.log(id);
      angular.extend(data, {id: id});
      // return $http.post('api/saveUser', data);
    };

});