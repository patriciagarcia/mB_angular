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

    {
      put: (obj) ->
        pouchdb.put(obj)
          .then (result) ->
            return result

      get: (id) ->
        pouchdb.get(id)
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
