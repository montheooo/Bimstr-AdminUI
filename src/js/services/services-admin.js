
app.factory('Album', function($resource) {
  return $resource('http://demo9379818.mockable.io/albums/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});

app.factory('Artist', function($resource) {
  return $resource('http://188.166.151.38:8080/bimstr/rest/artist/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});

app.factory('banner', function($resource) {
  return $resource('http://demo9379818.mockable.io/albums/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});

app.factory('Users', function($resource) {
  return $resource('http://demo9379818.mockable.io/admins/:id/:page', { id: '@_id'}, {
    getUserPagination:  {
      method:'GET', 
      isArray:false
    },
    update: {
      method: 'PUT'
    }
  });
});


app.factory('artistFactory', function($resource) {

      return $resource('http://188.166.151.38:8080/bimstr/rest/artist/:id',{ id: '@_id' }, {
   update: {
      method: 'PUT',
      isArray: true
    }
  });
});

app.factory('userFactory', function($resource) {
  return $resource('http://localhost:3000/api/me/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    },
    deleteUser: {
      method: 'DELETE',
      isArray: false
    }
  });
});

app.factory('Admin', function($resource) {
  return $resource('http://demo9379818.mockable.io/admins/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});