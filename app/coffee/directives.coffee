'use strict'

angular.module('myBeers.directives', [])
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
    controller: ($scope) ->
      $scope.beer = {}

      $scope.addReview = (form)->
        if form.$valid
          $scope.beers.push($scope.beer)
          emptyForm(form)

      emptyForm = (form) ->
        $scope.beer = {}
        form.$setPristine()
