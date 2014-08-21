'use strict'

describe 'myBeers app', ->

  beforeEach ->
    browser.get('index.html')

  it 'should render my beers list when user navigates to \"index.html\"', ->
    expect(browser.getTitle()).toEqual('My Beers')
    beers = element.all(By.css('.beer_list .beer'))
    expect(beers.count()).toEqual(10)
