'use strict'

angular.module('myBeers.services', [])
  .factory 'db', ->
    pouchdb = new PouchDB('beersdb')
    remoteCouch = 'http://ptrcgrc.iriscouch.com/beersdb'

    syncError = ->
      console.log('CouchDB sync error')

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
    }

  .factory 'geolocation', ['$q', ($q) ->
    deferred = $q.defer()

    onError = ->
      if (navigator.geolocation)
        error = 'Error: the geolocation service failed.'
      else
        error = 'Error: Your browser does not support geolocation.'

      deferred.reject(error)

    getCoords = (position) ->
      lat = position.coords.latitude
      lng = position.coords.longitude

      deferred.resolve({ lat: lat, lng: lng })

    # geolocation service return
    {
      getPosition: ->
        if (navigator.geolocation)
          navigator.geolocation.getCurrentPosition(getCoords, onError)
        else
          onError()

        return deferred.promise
    }
  ]
