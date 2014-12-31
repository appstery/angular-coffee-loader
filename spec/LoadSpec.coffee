'use strict'

describe "Different type of class registration", ->

  it "class extends AngularCoffeeLoader.Controller", ->

    Sample = {}

    class Sample.SimpleController extends AngularCoffeeLoader.Controller

      @inject '$scope'

      register: (app) =>
        console.log 'test register'
        super



    app = angular.module 'sample', []

    l = new AngularCoffeeLoader()
    l.bootstrap(app, Sample)

    angular.bootstrap document, ['sample']


    expect(app._invokeQueue[0].length).toBe 3

