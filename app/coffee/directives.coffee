'use strict'

angular.module('myBeers.directives', ['myBeers.services'])
  .directive 'beer', ->
    restrict: 'E'
    scope:
      beer: '='
    templateUrl: 'partials/beer.hbs'

  .directive 'beerList', ->
    restrict: 'E'
    scope:
      beers: '='
    templateUrl: 'partials/beerList.hbs'

  .directive 'reviewForm', ->
    restrict: 'E'
    scope:
      beers: '='
    templateUrl: 'partials/reviewForm.hbs'
    controller: ($scope, db) ->
      $scope.beer = {}

      $scope.searchBeer = (name) ->
        alert('Search not yet implemented. Coming soon.')

      $scope.addReview = (form)->

        if form.$valid
          $scope.beers.unshift($scope.beer)

          $scope.beer._id = new Date().toISOString()
          db.put($scope.beer).then (result) ->
            $scope.beer._rev = result.rev

          emptyForm(form)

      emptyForm = (form) ->
        $scope.beer = {}
        form.$setPristine()
