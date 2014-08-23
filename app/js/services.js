(function() {
  'use strict';
  angular.module('myBeers.services', []).factory('db', function() {
    var pouchdb, remoteCouch, sync, syncError;
    pouchdb = new PouchDB('beersdb');
    remoteCouch = 'http://ptrcgrc.iriscouch.com/beersdb';
    syncError = function() {
      return console.log('CouchDB sync error');
    };
    sync = function() {
      var opts;
      opts = {
        live: true
      };
      pouchdb.replicate.to(remoteCouch, opts, syncError);
      return pouchdb.replicate.from(remoteCouch, opts, syncError);
    };
    sync();
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
