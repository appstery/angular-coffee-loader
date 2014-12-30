'use strict'

describe "Different type of class registration", ->

  it "class extends CoffeeAngular.Controller", ->

    Sample = {}

    class Sample.SimpleController extends CoffeeAngular.Controller

      @inject '$scope'

      register: (app) =>
        super
        console.log 'test register'


    app = angular.module 'sample', []

    l = new CoffeeAngular()
    l.bootstrap(app, Sample)

    angular.bootstrap document, ['sample']

    console.log l, app
    

    expect(true).toBe true

