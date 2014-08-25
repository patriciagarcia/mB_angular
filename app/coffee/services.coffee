'use strict'

angular.module('myBeers.services', [])
  .factory 'db', ->
    pouchdb = new PouchDB('beersdb')
    remoteCouch = 'http://ptrcgrc.iriscouch.com/beersdb'

    syncError = ->
      console.log('CouchDB sync error') if console

    sync = ->
      opts =
        live: true
      pouchdb.replicate.to(remoteCouch, opts, syncError)
      pouchdb.replicate.from(remoteCouch, opts, syncError)

    # Sync to remote CouchDB
    sync()

    # db service return
    {
      put: (obj) ->
        pouchdb.put(obj)
          .then (result) ->
            return result

      get: (id) ->
        pouchdb.get(id)
          .then (result) ->
            return result

      delete: (obj) ->
        pouchdb.remove(obj)
          .then (result) ->
            return result

      # Returns a beer array
      all: ->
        pouchdb.allDocs(
          include_docs: true
          descending: true
        ).then (result) ->
          return result.rows
                    .map (beer) ->
                      return beer.doc

      # Register a callback that will be fired
      # when the db changes, locally or remotely.
      onChange: (callback) ->
        pouchdb.info (err, info) ->
          pouchdb.changes
            since: info.update_seq
            live: true
          .on 'change', ->
            callback()
    }

  .factory 'geolocation', ['$q', '$window', 'geocoding', ($q, $window, geocoding) ->
    # geolocation service return
    {
      getCurrentPosition: ->
        deferred = $q.defer()

        onError = ->
          if ($window.navigator.geolocation)
            error = 'Error: the geolocation service failed.'
          else
            error = 'Error: Your browser does not support geolocation.'
          deferred.reject(error)

        geocode = (data) ->
          position =
            lat: data.coords.latitude
            lon: data.coords.longitude

          geocoding.getPosition(position, true)
            .then (position) ->
              deferred.resolve(position) # return full position object
            .catch (error) ->
              position.displayName = "#{lat}, #{lon}"
              deferred.resolve(position) # return just lat and lon

        if ($window.navigator.geolocation)
          $window.navigator.geolocation.getCurrentPosition(geocode, onError)
        else
          onError()

        return deferred.promise
    }
  ]

  .factory 'geocoding', ['$q', '$http', ($q, $http) ->

    onError = (deferred, error) ->
      deferred.reject(error)

    returnPosition = (deferred, data) ->
      deferred.resolve
        lat: data.lat
        lon: data.lon
        address: data.address
        displayName: data.display_name
        addressCache: data.display_name

    # geocoding service return
    {
      getPosition: (location, reverse = false) ->
        deferred = $q.defer()

        url = "http://nominatim.openstreetmap.org/#{if reverse then 'reverse' else 'search'}"

        params =
          format: 'json'
          addressdetails: 1

        if (reverse)
          params['lat'] = location.lat
          params['lon'] = location.lon
        else
          params['q'] = location.displayName

        $http
          method: 'GET'
          url: url
          params: params

        .success (data) ->
          data = data[0] if data instanceof Array # 'search' returns an array
          returnPosition(deferred, data)

        .error (data) ->
          onError(deferred, data)

        return deferred.promise
    }
  ]
