(function() {
  'use strict';
  angular.module('myBeers.directives', []).directive('beer', function() {
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
        var empty_stars, full_stars, num, rating;
        rating = scope.rating || 0;
        full_stars = (function() {
          var _i, _results;
          _results = [];
          for (num = _i = 0; 0 <= rating ? _i < rating : _i > rating; num = 0 <= rating ? ++_i : --_i) {
            _results.push({
              empty: false
            });
          }
          return _results;
        })();
        empty_stars = (function() {
          var _i, _ref, _results;
          _results = [];
          for (num = _i = 0, _ref = 5 - rating; 0 <= _ref ? _i < _ref : _i > _ref; num = 0 <= _ref ? ++_i : --_i) {
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
  }).directive('reviewForm', [
    'geolocation', function(geolocation) {
      return {
        restrict: 'E',
        scope: {
          beers: '=',
          add: '='
        },
        templateUrl: 'partials/reviewForm.hbs',
        controller: function($scope) {
          var emptyForm, searchingPosition, showPosition, toggleSubmitDisabled;
          $scope.beer = {};
          $scope.searchBeer = function(name) {
            return alert('Search not yet implemented. Coming soon.');
          };
          $scope.addReview = function(form) {
            if (form.$valid) {
              $scope.add($scope.beer);
              return emptyForm(form);
            }
          };
          $scope.getPosition = function() {
            searchingPosition();
            return geolocation.getPosition().then(function(position) {
              return showPosition(position);
            })["catch"](function(error) {
              return searchingPosition(false, error);
            });
          };
          searchingPosition = function(searching, error) {
            var placeholder;
            if (searching == null) {
              searching = true;
            }
            placeholder = searching ? 'Finding location..' : 'Where did you find the beer?';
            angular.element('#beer_location').attr('placeholder', placeholder).prop('disabled', searching);
            toggleSubmitDisabled();
            if (!searching) {
              return alert("" + error + " \n Please, enter location manually.");
            }
          };
          showPosition = function(position) {
            angular.element('#beer_location').val("" + position.lat + ", " + position.lng).prop('disabled', false);
            return toggleSubmitDisabled();
          };
          toggleSubmitDisabled = function(disabled) {
            var submit;
            submit = angular.element('.review_form .submit');
            disabled = disabled || !submit.prop('disabled');
            return submit.prop('disabled', disabled);
          };
          return emptyForm = function(form) {
            $scope.beer = {};
            return form.$setPristine();
          };
        }
      };
    }
  ]);

}).call(this);
