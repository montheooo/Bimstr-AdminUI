
app.factory('Album', function($resource) {
  return $resource('http://188.166.151.38:8080/bimstr/rest/song/album/', { id: '@_id' }, {
    update: {
      method: 'PUT', params: {id: '@_id'}
    }, 
    delete: {
      method:'DELETE', params: {id: '@_id'}
    }, 
    show: { method: 'GET'},
  });
});

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