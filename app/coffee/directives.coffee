'use strict'

angular.module('myBeers.directives', [])
  .directive 'beerMap', ->
    restrict: 'E'
    scope:
      beers: '='
    templateUrl: 'partials/map.hbs'
    controller: ($scope, $window) ->
      # Init the map, marker layer and geojson
      $window.L.mapbox.accessToken = $window.secrets.mapboxAccessToken
      map = $window.L.mapbox.map('map', 'ptrcgrc.jalbaddk')
      markersLayer = $window.L.mapbox.featureLayer().addTo(map)
      geojson =
        type: 'FeatureCollection'
        features: []

      # Watch for changes in 'beers' collection
      $scope.$watchCollection 'beers', (newBeers, oldBeers) ->
        $scope.addMarkers(onlyNewItems(newBeers, oldBeers))

      $scope.addMarkers = (beers) ->
        for beer in beers
          marker =
            type: 'Feature'
            properties:
              title: beer.beer_name
              description: "By #{beer.brewery_name}"
              'marker-color': '#7ec9b1'
              'marker-size': 'medium'
            geometry:
              type: 'Point'
              coordinates: [beer.beer_location.lon, beer.beer_location.lat]

          geojson['features'].push(marker)

        markersLayer.setGeoJSON(geojson)

      onlyNewItems = (newCollection, oldCollection) ->
        newItems = []

        for item in newCollection
          if item in newCollection and item not in oldCollection
            newItems.push(item)

        newItems

  .directive 'beer', ->
    restrict: 'E'
    scope:
      beer: '='
      delete: '='
    templateUrl: 'partials/beer.hbs'

  .directive 'rating', ->
    restrict: 'E'
    scope:
      rating: '@'
    templateUrl: 'partials/rating.hbs'
    link: (scope, elem, attrs) ->
      rating = scope.rating || 0
      full_stars = ({empty: false} for num in [0...rating])
      empty_stars = ({empty: true} for num in [0...(5 - rating)])
      scope.stars = full_stars.concat empty_stars

  .directive 'beerList', ->
    restrict: 'E'
    scope:
      beers: '='
      delete: '='
      title: '@'
    templateUrl: 'partials/beerList.hbs'

  .directive 'reviewForm', ['geolocation', 'geocoding', (geolocation, geocoding) ->
    restrict: 'E'
    scope:
      add: '='
    templateUrl: 'partials/reviewForm.hbs'
    controller: ($scope) ->
      emptyBeer = -> {beer_location: address: {}}

      $scope.beer = emptyBeer()

      $scope.searchBeer = (name) ->
        alert('Search not yet implemented. Coming soon.')

      $scope.addReview = (form)->
        if form.$valid
          # If user got address from geolocation and didn't change it.
          if ($scope.beer.beer_location.lat and
                $scope.beer.beer_location.addressCache is $scope.beer.beer_location.displayName)
            saveAndCleanReview(form)
          else # discard beer_location and geocode the new displayName
            displayName = $scope.beer.beer_location.displayName
            clearBeerLocation()

            geocoding.getPosition({displayName: displayName})
              .then (position) ->
                $scope.beer.beer_location = position
              .catch ->
                $scope.beer.beer_location.displayName = displayName
              .finally ->
                saveAndCleanReview(form)

      $scope.getCurrentPosition = ->
        showSearchingLocation()

        geolocation.getCurrentPosition()
          .then (position) ->
            $scope.beer.beer_location = position
            showSearchingLocation(false)
          .catch (error) ->
            showSearchingLocation(false, error)

      saveAndCleanReview = (form) ->
        delete $scope.beer.beer_location.addressCache
        $scope.add($scope.beer)
        emptyForm(form)

      showSearchingLocation = (searching = true, error) ->
        if searching or error
          searchingMessage = 'Finding current location.'
          errorMessage = 'Please, enter location manually.'
          updateLocationInputPlaceholder(if searching then searchingMessage else errorMessage)

        toggleLocationInputDisabled(searching)
        toggleSubmitDisabled(searching)

        alert("#{error} \n #{errorMessage}.") if error

      submitButton = angular.element('.review_form .submit')
      locationInput = angular.element('#beer_location')

      updateLocationInputPlaceholder = (message) ->
        locationInput.prop('placeholder', message)

      toggleLocationInputDisabled = (disabled) ->
        locationInput.prop('disabled', disabled || !locationInput.prop('disabled'))

      toggleSubmitDisabled = (disabled) ->
        submitButton.prop('disabled', disabled || !submitButton.prop('disabled'))

      clearBeerLocation = ->
        $scope.beer.beer_location =
          address: {}

      emptyForm = (form) ->
        $scope.beer = emptyBeer()
        form.$setPristine()
  ]
