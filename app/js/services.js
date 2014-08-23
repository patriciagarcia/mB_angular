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
      "delete": function(obj) {
        return pouchdb.remove(obj).then(function(result) {
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
  }).factory('geolocation', [
    '$q', function($q) {
      var deferred, getCoords, onError;
      deferred = $q.defer();
      onError = function() {
        var error;
        if (navigator.geolocation) {
          error = 'Error: the geolocation service failed.';
        } else {
          error = 'Error: Your browser does not support geolocation.';
        }
        return deferred.reject(error);
      };
      getCoords = function(position) {
        var lat, lng;
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        return deferred.resolve({
          lat: lat,
          lng: lng
        });
      };
      return {
        getPosition: function() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoords, onError);
          } else {
            onError();
          }
          return deferred.promise;
        }
      };
    }
  ]);

}).call(this);
