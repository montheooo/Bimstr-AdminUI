
app.factory('Album', ['$resource', function($resource) {
    return {
        Show_all: $resource('http://188.166.151.38:8080/bimstr/rest/music/album/', {},
            {
                method: 'GET',
                isArray: true
            }),
        Update: $resource('http://188.166.151.38:8080/bimstr/rest/music/album/:id', { id: '@id' },
            {
                method: 'GET',
                isArray: true
            }),
        Post: $resource('http://188.166.151.38:8080/bimstr/rest/music/album/:id', { id: '@id' },
            {
                method: 'GET',
                isArray: true
            }),
        Delete: $resource('http://188.166.151.38:8080/bimstr/rest/music/album/:id', { id: '@id' },
            {
                method: 'GET',
                isArray: true
            })
    };
}]);

app.factory('Playlists', function ($resource) {

  return $resource('http://188.166.151.38:8080/bimstr/rest/music/playlist/', {}, {
    show_all: { method: 'GET', isArray:true}
  });
});

app.factory('Playlists', ['$resource', function ($resource) {
    return {
        Show_all: $resource('http://188.166.151.38:8080/bimstr/rest/music/playlist/', {},
            {
                method: 'GET',
                isArray: true
            }),
        Update: $resource('http://188.166.151.38:8080/bimstr/rest/music/playlist/:id', { id: '@id' },
            {
                method: 'PUT',
                isArray: false
            }),
        Post: $resource('http://188.166.151.38:8080/bimstr/rest/music/playlist/:id', { id: '@id' },
            {
                method: 'POST',
                isArray: false
            }),
        Delete: $resource('http://188.166.151.38:8080/bimstr/rest/music/playlist/:id', { id: '@id' },
            {
                method: 'DELETE',
                isArray: false
            })
    };
}]);


app.factory('Users', function($resource) {
  return $resource('', { id: '@_id'}, {
    getUserPagination:  {
      method:'GET', 
      isArray:false
    },
    update: {
      method: 'PUT'
    }
  });
});


app.factory('LoginFactory', function($resource) {
  return {
    getUserInfos: function(access_token) {
      return $resource('http://188.166.164.5:8080/bihh/rest/user/login/facebook', {}, {
             query: { method: 'POST', params: {code:access_token}, isArray: false }
      }).query();
    }
  }
});

app.factory('User', function($resource) {
  return $resource('http://localhost:3000/api/me/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    },
    getFacebookInfo: {
      method: 'GET',
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