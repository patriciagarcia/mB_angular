'use strict'

angular.module('myBeers.directives', [])
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

  .directive 'reviewForm', ->
    restrict: 'E'
    scope:
      beers: '='
      add: '='
    templateUrl: 'partials/reviewForm.hbs'
    controller: ($scope) ->
      $scope.beer = {}

      $scope.searchBeer = (name) ->
        alert('Search not yet implemented. Coming soon.')

      $scope.addReview = (form)->
        if form.$valid
          $scope.add($scope.beer)
          emptyForm(form)

      emptyForm = (form) ->
        $scope.beer = {}
        form.$setPristine()
