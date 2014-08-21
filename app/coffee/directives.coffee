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
    replace: true
