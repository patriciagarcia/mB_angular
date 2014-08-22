(function() {
  'use strict';
  angular.module('myBeers.services', []).factory('db', function() {
    var pouchdb;
    pouchdb = new PouchDB('beersdb');
    return {
      put: function(obj) {
        return pouchdb.put(obj).then(function(result) {
          return result;
        });
      },
      get: function(id) {
        return pouchdb.get(id).then(function(result) {
          return result;
        });
      },
      all: function() {
        return pouchdb.allDocs({
          include_docs: true,
          descending: true
        }).then(function(result) {
          return result.rows.map(function(beer) {
            return beer.doc;
          });
        });
      }
    };
  });

}).call(this);
