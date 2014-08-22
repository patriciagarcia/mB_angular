(function() {
  'use strict';
  var beers;

  angular.module('myBeers.controllers', ['myBeers.services']).controller('myBeerListCtrl', [
    '$scope', 'db', function($scope, db) {
      $scope.beers = [];
      return db.all().then(function(result) {
        $scope.beers = result;
        return $scope.$apply();
      });
    }
  ]);

  beers = [
    {
      beer_name: 'Dead Pony Club',
      beer_style: 'Californian Pale Ale',
      beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.',
      beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg',
      beer_rating: 4,
      brewery_name: 'Brew Dog',
      brewery_location: 'Scotland'
    }, {
      beer_name: 'Dead Pony Club',
      beer_style: 'Californian Pale Ale',
      beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.',
      beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg',
      beer_rating: 4,
      brewery_name: 'Brew Dog',
      brewery_location: 'Scotland'
    }, {
      beer_name: 'Dead Pony Club',
      beer_style: 'Californian Pale Ale',
      beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.',
      beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg',
      beer_rating: 4,
      brewery_name: 'Brew Dog',
      brewery_location: 'Scotland'
    }, {
      beer_name: 'Dead Pony Club',
      beer_style: 'Californian Pale Ale',
      beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.',
      beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg',
      beer_rating: 4,
      brewery_name: 'Brew Dog',
      brewery_location: 'Scotland'
    }, {
      beer_name: 'Dead Pony Club',
      beer_style: 'Californian Pale Ale',
      beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.',
      beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg',
      beer_rating: 4,
      brewery_name: 'Brew Dog',
      brewery_location: 'Scotland'
    }, {
      beer_name: 'Dead Pony Club',
      beer_style: 'Californian Pale Ale',
      beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.',
      beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg',
      beer_rating: 4,
      brewery_name: 'Brew Dog',
      brewery_location: 'Scotland'
    }, {
      beer_name: 'Dead Pony Club',
      beer_style: 'Californian Pale Ale',
      beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.',
      beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg',
      beer_rating: 4,
      brewery_name: 'Brew Dog',
      brewery_location: 'Scotland'
    }, {
      beer_name: 'Dead Pony Club',
      beer_style: 'Californian Pale Ale',
      beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.',
      beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg',
      beer_rating: 4,
      brewery_name: 'Brew Dog',
      brewery_location: 'Scotland'
    }, {
      beer_name: 'Dead Pony Club',
      beer_style: 'Californian Pale Ale',
      beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.',
      beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg',
      beer_rating: 4,
      brewery_name: 'Brew Dog',
      brewery_location: 'Scotland'
    }, {
      beer_name: 'Dead Pony Club',
      beer_style: 'Californian Pale Ale',
      beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.',
      beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg',
      beer_rating: 4,
      brewery_name: 'Brew Dog',
      brewery_location: 'Scotland'
    }
  ];

}).call(this);
