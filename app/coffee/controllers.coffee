'use strict'

angular.module('myBeers.controllers', [])
  .controller 'myBeerListCtrl', ['$scope', 'db', ($scope, db) ->
    $scope.beers = []

    $scope.showingFavorites = false

    setBeers = (beers) ->
      $scope.$apply ->
        $scope.beers = beers

    $scope.fetchAllBeers = ->
      $scope.showingFavorites = false
      db.all().then (data) -> setBeers(data)

    favoriteMap = (doc) ->
      emit(doc) if doc.beer_rating > 4

    $scope.fetchFavoriteBeers = ->
      $scope.showingFavorites = true
      db.query(favoriteMap).then (data) -> setBeers(data)

    onChange = ->
      if $scope.showingFavorites
        $scope.fetchFavoriteBeers()
      else
        $scope.fetchAllBeers()

    $scope.fetchAllBeers()
    db.onChange(onChange)

    $scope.deleteBeer = (beer) ->
      $scope.beers.splice($scope.beers.indexOf(beer), 1)
      db.delete(beer)

    $scope.addBeer = (beer) ->
      $scope.beers.unshift(beer)

      beer._id = new Date().toISOString()
      db.put(beer).then (data) ->
        beer._rev = data.rev
  ]
