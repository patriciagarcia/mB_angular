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
  }).directive('rating', function() {
    return {
      restrict: 'E',
      scope: {
        rating: '@'
      },
      templateUrl: 'partials/rating.hbs',
      link: function(scope, elem, attrs) {
        var empty_stars, full_stars, num;
        full_stars = (function() {
          var _i, _ref, _results;
          _results = [];
          for (num = _i = 1, _ref = scope.rating; 1 <= _ref ? _i <= _ref : _i >= _ref; num = 1 <= _ref ? ++_i : --_i) {
            _results.push({
              empty: false
            });
          }
          return _results;
        })();
        empty_stars = (function() {
          var _i, _ref, _results;
          _results = [];
          for (num = _i = 1, _ref = 5 - scope.rating; 1 <= _ref ? _i <= _ref : _i >= _ref; num = 1 <= _ref ? ++_i : --_i) {
            _results.push({
              empty: true
            });
          }
          return _results;
        })();
        return scope.stars = full_stars.concat(empty_stars);
      }
    };
  }).directive('beerList', function() {
    return {
      restrict: 'E',
      scope: {
        beers: '=',
        "delete": '=',
        title: '@'
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
