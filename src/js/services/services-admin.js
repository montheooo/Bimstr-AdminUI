
app.factory('Album', function($resource) {
  return $resource('http://188.166.151.38:8080/bimstr/rest/music/album/:id', { id: '@_id' }, {
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

app.factory('Banner', function($resource) {
  return $resource('http://188.166.151.38:8080/bimstr/rest/banner/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});

app.factory('User', function($resource) {
  return $resource('http://188.166.151.38:8080/bimstr/rest/user/:id', { id: '@_id'}, {
  
    update: {
      method: 'PUT'
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