'use strict'

describe 'myBeers app', ->

  browser.get('index.html')

  it 'should render my beers list when user navigates to \"index.html\"', ->
    expect(browser.getTitle()).toEqual('My Beers')
