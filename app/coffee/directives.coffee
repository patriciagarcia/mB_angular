'use strict'

angular.module('myBeers.directives', ['myBeers.services'])
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
      full_stars = ({empty: false} for num in [1..scope.rating])
      empty_stars = ({empty: true} for num in [1..5 - scope.rating])
      scope.stars = full_stars.concat empty_stars

  .directive 'beerList', ->
    restrict: 'E'
    scope:
      beers: '='
      delete: '='
      title: '@'
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
          db.put($scope.beer).then (data) ->
            $scope.beer._rev = data.rev

          emptyForm(form)

      emptyForm = (form) ->
        $scope.beer = {}
        form.$setPristine()
