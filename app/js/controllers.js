(function() {
  'use strict';
  angular.module('myBeers.controllers', []).controller('myBeerListCtrl', [
    '$scope', 'db', function($scope, db) {
      var favoriteMap, onChange, setBeers;
      $scope.beers = [];
      $scope.showingFavorites = false;
      setBeers = function(beers) {
        return $scope.$apply(function() {
          return $scope.beers = beers;
        });
      };
      $scope.fetchAllBeers = function() {
        $scope.showingFavorites = false;
        return db.all().then(function(data) {
          return setBeers(data);
        });
      };
      favoriteMap = function(doc) {
        if (doc.beer_rating > 4) {
          return emit(doc);
        }
      };
      $scope.fetchFavoriteBeers = function() {
        $scope.showingFavorites = true;
        return db.query(favoriteMap).then(function(data) {
          return setBeers(data);
        });
      };
      onChange = function() {
        if ($scope.showingFavorites) {
          return $scope.fetchFavoriteBeers();
        } else {
          return $scope.fetchAllBeers();
        }
      };
      $scope.fetchAllBeers();
      db.onChange(onChange);
      $scope.deleteBeer = function(beer) {
        $scope.beers.splice($scope.beers.indexOf(beer), 1);
        return db["delete"](beer);
      };
      return $scope.addBeer = function(beer) {
        $scope.beers.unshift(beer);
        beer._id = new Date().toISOString();
        return db.put(beer).then(function(data) {
          return beer._rev = data.rev;
        });
      };
    }
  ]);

}).call(this);
