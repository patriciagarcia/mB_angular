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
      templateUrl: 'partials/beerList.hbs'
    };
  }).directive('reviewForm', function() {
    return {
      restrict: 'E',
      scope: {
        beers: '='
      },
      templateUrl: 'partials/reviewForm.hbs',
      controller: function($scope) {
        var emptyForm;
        $scope.beer = {};
        $scope.addReview = function(form) {
          if (form.$valid) {
            $scope.beers.push($scope.beer);
            return emptyForm(form);
          }
        };
        return emptyForm = function(form) {
          $scope.beer = {};
          return form.$setPristine();
        };
      }
    };
  });

}).call(this);
