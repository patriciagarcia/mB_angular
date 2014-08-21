(function() {
  'use strict';
  angular.module('myBeers.directives', []).directive('beer', function() {
    return {
      restrict: 'E',
      scope: {
        beer: '='
      },
      templateUrl: 'partials/beer.hbs'
    };
  }).directive('beerList', function() {
    return {
      restrict: 'E',
      scope: {
        beers: '='
      },
      templateUrl: 'partials/beerList.hbs',
      replace: true
    };
  });

}).call(this);
