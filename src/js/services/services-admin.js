
app.factory('Album', function($resource) {
  return $resource('http://178.62.12.238:8080/bimstr/rest/music/album/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});

app.factory('Song', function($resource) {
  return $resource('http://178.62.12.238:8080/bimstr/rest/music/song/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});

app.factory('Beat', function($resource) {
  return $resource('http://178.62.12.238:8080/bimstr/rest/music/beat/:id', { id: '@_id', sort: 'releaseDate', desc: 'desc' }, {
    update: {
      method: 'PUT'
    }
  });
});

app.factory('Video', function($resource) {
  return $resource('http://178.62.12.238:8080/bimstr/rest/music/video/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});

app.factory('User', function($resource) {
  return $resource('http://178.62.12.238:8080/bimstr/rest/music/user/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});

app.factory('Song2playlist', function($resource) {
  return $resource('http://178.62.12.238:8080/bimstr/rest/music/song2playlist/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});

app.factory('saveSong2playlist', function($resource) {
  return $resource('http://178.62.12.238:8080/bimstr/rest/music/playlist/:playlistId/add/:songId', { playlistId: '@_id', songId: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});
app.factory('RmSong2playlist', function($resource) {
  return $resource('http://178.62.12.238:8080/bimstr/rest/music/playlist/:playlistId/rem/:songId', { playlistId: '@_id', songId: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});

app.factory('Playlist', function($resource) {
  return $resource('http://178.62.12.238:8080/bimstr/rest/music/playlist/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});
app.factory('Artist', function($resource) {
  return $resource('http://178.62.12.238:8080/bimstr/rest/artist/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});

app.factory('Article', function($resource) {
  return $resource('http://178.62.12.238:8080/bimstr/rest/article/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});
app.factory('Banner', function($resource) {
  return $resource('http://178.62.12.238:8080/bimstr/rest/banner/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});

app.factory('User', function($resource) {
  return $resource('http://178.62.12.238:8080/bimstr/rest/user/:id', { id: '@_id'}, {
  
    update: {
      method: 'PUT'
    }
  });
});

app.factory('Submit', function($resource) {
  return $resource('http://178.62.12.238:8080/bimstr/rest/submit/:id', { id: '@_id'}, {
  
    update: {
      method: 'PUT'
    }
  });
});

app.factory('Validation', function($resource) {
  return $resource('http://178.62.12.238:8080/bimstr/rest/validation/singleSubmission/:id', { id: '@_id'}, {
  
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