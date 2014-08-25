(function() {
  'use strict';
  angular.module('myBeers.services', []).factory('db', [
    'COUCHDB', function(COUCHDB) {
      var pouchdb, remoteCouch, sync, syncError;
      pouchdb = new PouchDB('beersdb');
      remoteCouch = COUCHDB.remoteCouch;
      syncError = function() {
        if (console) {
          return console.log('CouchDB sync error');
        }
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
        },
        onChange: function(callback) {
          return pouchdb.info(function(err, info) {
            return pouchdb.changes({
              since: info.update_seq,
              live: true
            }).on('change', function() {
              return callback();
            });
          });
        }
      };
    }
  ]).factory('geolocation', [
    '$q', '$window', 'geocoding', 'GEOLOCATION', function($q, $window, geocoding, GEOLOCATION) {
      return {
        getCurrentPosition: function() {
          var deferred, geocode, onError;
          deferred = $q.defer();
          onError = function() {
            var error;
            if ($window.navigator.geolocation) {
              error = GEOLOCATION.serviceErrorMsg;
            } else {
              error = GEOLOCATION.supportErrorMsg;
            }
            return deferred.reject(error);
          };
          geocode = function(data) {
            var position;
            position = {
              lat: data.coords.latitude,
              lon: data.coords.longitude
            };
            return geocoding.getPosition(position, true).then(function(position) {
              return deferred.resolve(position);
            })["catch"](function(error) {
              position.displayName = "" + lat + ", " + lon;
              return deferred.resolve(position);
            });
          };
          if ($window.navigator.geolocation) {
            $window.navigator.geolocation.getCurrentPosition(geocode, onError);
          } else {
            onError();
          }
          return deferred.promise;
        }
      };
    }
  ]).factory('geocoding', [
    '$q', '$http', 'NOMINATIM', function($q, $http, NOMINATIM) {
      var onError, returnPosition;
      onError = function(deferred, error) {
        return deferred.reject(error);
      };
      returnPosition = function(deferred, data) {
        return deferred.resolve({
          lat: data.lat,
          lon: data.lon,
          address: data.address,
          displayName: data.display_name,
          addressCache: data.display_name
        });
      };
      return {
        getPosition: function(location, reverse) {
          var deferred, params, url;
          if (reverse == null) {
            reverse = false;
          }
          deferred = $q.defer();
          url = "" + NOMINATIM.geocodingUrl + (reverse ? 'reverse' : 'search');
          params = {
            format: 'json',
            addressdetails: 1
          };
          if (reverse) {
            params['lat'] = location.lat;
            params['lon'] = location.lon;
          } else {
            params['q'] = location.displayName;
          }
          $http({
            method: 'GET',
            url: url,
            params: params
          }).success(function(data) {
            if (data instanceof Array) {
              data = data[0];
            }
            return returnPosition(deferred, data);
          }).error(function(data) {
            return onError(deferred, data);
          });
          return deferred.promise;
        }
      };
    }
  ]);

}).call(this);
