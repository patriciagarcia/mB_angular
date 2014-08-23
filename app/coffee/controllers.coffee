'use strict'

angular.module('myBeers.controllers', [])
  .controller 'myBeerListCtrl', ['$scope', 'db', ($scope, db) ->
    $scope.beers = []

    db.all().then (data) ->
      $scope.$apply ->
        $scope.beers = data

    $scope.deleteBeer = (beer) ->
      $scope.beers.splice($scope.beers.indexOf(beer), 1)
      db.delete(beer)

    $scope.addBeer = (beer) ->
      $scope.beers.unshift(beer)

      beer._id = new Date().toISOString()
      db.put(beer).then (data) ->
        beer._rev = data.rev
  ]

beers = [
    beer_name: 'Dead Pony Club'
    beer_style: 'Californian Pale Ale'
    beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.'
    beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg'
    beer_rating: 4
    brewery_name: 'Brew Dog'
    brewery_location: 'Scotland'
  ,
    beer_name: 'Dead Pony Club'
    beer_style: 'Californian Pale Ale'
    beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.'
    beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg'
    beer_rating: 4
    brewery_name: 'Brew Dog'
    brewery_location: 'Scotland'
  ,
    beer_name: 'Dead Pony Club'
    beer_style: 'Californian Pale Ale'
    beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.'
    beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg'
    beer_rating: 4
    brewery_name: 'Brew Dog'
    brewery_location: 'Scotland'
  ,
    beer_name: 'Dead Pony Club'
    beer_style: 'Californian Pale Ale'
    beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.'
    beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg'
    beer_rating: 4
    brewery_name: 'Brew Dog'
    brewery_location: 'Scotland'
  ,
    beer_name: 'Dead Pony Club'
    beer_style: 'Californian Pale Ale'
    beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.'
    beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg'
    beer_rating: 4
    brewery_name: 'Brew Dog'
    brewery_location: 'Scotland'
  ,
    beer_name: 'Dead Pony Club'
    beer_style: 'Californian Pale Ale'
    beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.'
    beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg'
    beer_rating: 4
    brewery_name: 'Brew Dog'
    brewery_location: 'Scotland'
  ,
    beer_name: 'Dead Pony Club'
    beer_style: 'Californian Pale Ale'
    beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.'
    beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg'
    beer_rating: 4
    brewery_name: 'Brew Dog'
    brewery_location: 'Scotland'
  ,
    beer_name: 'Dead Pony Club'
    beer_style: 'Californian Pale Ale'
    beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.'
    beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg'
    beer_rating: 4
    brewery_name: 'Brew Dog'
    brewery_location: 'Scotland'
  ,
    beer_name: 'Dead Pony Club'
    beer_style: 'Californian Pale Ale'
    beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.'
    beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg'
    beer_rating: 4
    brewery_name: 'Brew Dog'
    brewery_location: 'Scotland'
  ,
    beer_name: 'Dead Pony Club'
    beer_style: 'Californian Pale Ale'
    beer_description: 'The new 3.8% Pale Ale is brewed with a solid malt base, moderate bitterness and masses of late hops and dry hops, specifically Citra, Simcoe and HBC.'
    beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_164769_sm_8722478429a9dca1cff174477189bd.jpeg'
    beer_rating: 4
    brewery_name: 'Brew Dog'
    brewery_location: 'Scotland'
  ]
