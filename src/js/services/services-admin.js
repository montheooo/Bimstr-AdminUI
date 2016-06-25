
app.factory('Album', function($resource) {
  return $resource('http://demo9379818.mockable.io/albums/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
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