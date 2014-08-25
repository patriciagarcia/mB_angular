'use strict'

angular.module('myBeers.constants', [])
  .constant 'MAPBOX',
    mapId: 'ptrcgrc.jalbaddk'
    markerColors: ['#f3f781', '#f3f781', '#f3f781', '#7ec9b1', '#fa8258']
    markerSize: 'medium'

  .constant 'RATING',
    maxRating: 5

  .constant 'GEOLOCATION',
    searchingMsg: 'Finding current location.'
    searchingErrorMsg: 'Please, enter location manually.'
    serviceErrorMsg: 'Error: the geolocation service failed.'
    supportErrorMsg: 'Error: your browser does not support geolocation.'

  .constant 'NOMINATIM',
    geocodingUrl: 'http://nominatim.openstreetmap.org/'

  .constant 'COUCHDB',
    remoteCouch: 'http://ptrcgrc.iriscouch.com/beersdb'
