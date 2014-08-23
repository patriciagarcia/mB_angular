(function() {
  'use strict';
  angular.module('myBeers.directives', ['myBeers.services']).directive('beer', function() {
    return {
      restrict: 'E',
      scope: {
        beer: '=',
        "delete": '='
      },
      templateUrl: 'partials/beer.hbs'
    };
  }).directive('beerList', function() {
    return {
      restrict: 'E',
      scope: {
        beers: '=',
        "delete": '='
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
      controller: function($scope, db) {
        var emptyForm;
        $scope.beer = {};
        $scope.searchBeer = function(name) {
          return alert('Search not yet implemented. Coming soon.');
        };
        $scope.addReview = function(form) {
          if (form.$valid) {
            $scope.beers.unshift($scope.beer);
            $scope.beer._id = new Date().toISOString();
            db.put($scope.beer).then(function(data) {
              return $scope.beer._rev = data.rev;
            });
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
