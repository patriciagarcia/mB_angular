(function() {
  'use strict';
  angular.module('myBeers.directives', []).directive('beerMap', function() {
    return {
      restrict: 'E',
      scope: {
        beers: '='
      },
      templateUrl: 'partials/map.hbs',
      controller: function($scope, $window) {
        var geojson, map, markersLayer;
        $window.L.mapbox.accessToken = $window.secrets.mapboxAccessToken;
        map = $window.L.mapbox.map('map', 'ptrcgrc.jalbaddk');
        markersLayer = $window.L.mapbox.featureLayer().addTo(map);
        geojson = {
          type: 'FeatureCollection',
          features: []
        };
        $scope.$watchCollection('beers', function(newBeers, oldBeers) {
          return $scope.addMarkers(newBeers);
        });
        return $scope.addMarkers = function(beers) {
          var beer, marker, markers, _i, _len;
          markers = [];
          for (_i = 0, _len = beers.length; _i < _len; _i++) {
            beer = beers[_i];
            marker = {
              type: 'Feature',
              properties: {
                title: beer.beer_name,
                description: "By " + beer.brewery_name,
                'marker-color': '#7ec9b1',
                'marker-size': 'medium'
              },
              geometry: {
                type: 'Point',
                coordinates: [beer.beer_location.lon, beer.beer_location.lat]
              }
            };
            markers.push(marker);
          }
          geojson['features'] = markers;
          return markersLayer.setGeoJSON(geojson);
        };
      }
    };
  }).directive('beer', function() {
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
    'geolocation', 'geocoding', function(geolocation, geocoding) {
      return {
        restrict: 'E',
        scope: {
          add: '='
        },
        templateUrl: 'partials/reviewForm.hbs',
        controller: function($scope) {
          var clearBeerLocation, emptyBeer, emptyForm, locationInput, saveAndCleanReview, showSearchingLocation, submitButton, toggleLocationInputDisabled, toggleSubmitDisabled, updateLocationInputPlaceholder;
          emptyBeer = function() {
            return {
              beer_location: {
                address: {}
              }
            };
          };
          $scope.beer = emptyBeer();
          $scope.searchBeer = function(name) {
            return alert('Search not yet implemented. Coming soon.');
          };
          $scope.addReview = function(form) {
            var displayName;
            if (form.$valid) {
              if ($scope.beer.beer_location.lat && $scope.beer.beer_location.addressCache === $scope.beer.beer_location.displayName) {
                return saveAndCleanReview(form);
              } else {
                displayName = $scope.beer.beer_location.displayName;
                clearBeerLocation();
                return geocoding.getPosition({
                  displayName: displayName
                }).then(function(position) {
                  return $scope.beer.beer_location = position;
                })["catch"](function() {
                  return $scope.beer.beer_location.displayName = displayName;
                })["finally"](function() {
                  return saveAndCleanReview(form);
                });
              }
            }
          };
          $scope.getCurrentPosition = function() {
            showSearchingLocation();
            return geolocation.getCurrentPosition().then(function(position) {
              $scope.beer.beer_location = position;
              return showSearchingLocation(false);
            })["catch"](function(error) {
              return showSearchingLocation(false, error);
            });
          };
          saveAndCleanReview = function(form) {
            delete $scope.beer.beer_location.addressCache;
            $scope.add($scope.beer);
            return emptyForm(form);
          };
          showSearchingLocation = function(searching, error) {
            var errorMessage, searchingMessage;
            if (searching == null) {
              searching = true;
            }
            if (searching || error) {
              searchingMessage = 'Finding current location.';
              errorMessage = 'Please, enter location manually.';
              updateLocationInputPlaceholder(searching ? searchingMessage : errorMessage);
            }
            toggleLocationInputDisabled(searching);
            toggleSubmitDisabled(searching);
            if (error) {
              return alert("" + error + " \n " + errorMessage + ".");
            }
          };
          submitButton = angular.element('.review_form .submit');
          locationInput = angular.element('#beer_location');
          updateLocationInputPlaceholder = function(message) {
            return locationInput.prop('placeholder', message);
          };
          toggleLocationInputDisabled = function(disabled) {
            return locationInput.prop('disabled', disabled || !locationInput.prop('disabled'));
          };
          toggleSubmitDisabled = function(disabled) {
            return submitButton.prop('disabled', disabled || !submitButton.prop('disabled'));
          };
          clearBeerLocation = function() {
            return $scope.beer.beer_location = {
              address: {}
            };
          };
          return emptyForm = function(form) {
            $scope.beer = emptyBeer();
            return form.$setPristine();
          };
        }
      };
    }
  ]);

}).call(this);
