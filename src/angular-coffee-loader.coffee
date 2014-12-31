'use strict'

class window.AngularCoffeeLoader

  VERSION = '0.0.1'

  traverse: (o, func) =>
    for i of o
      if o[i] isnt null and typeof (o[i]) is 'object'
        @traverse o[i], func
      else
        func.apply this, [o[i]]

  bootstrap: (@app, @namespace) =>
    @traverse(@namespace, @loadClass)

  loadClass: (klass)  =>
    if klass.prototype instanceof AngularCoffeeLoader.Abstract
      klass.register(@app)
    


class AngularCoffeeLoader.Abstract

  @inject: (args...) ->
    @$inject = args

  constructor: (args...) ->
    for key, index in @constructor.$inject
      @[key] = args[index]

  register: () =>


class AngularCoffeeLoader.Controller extends AngularCoffeeLoader.Abstract

  @register: (app) ->
    app.controller @name, @


class AngularCoffeeLoader.Directive extends AngularCoffeeLoader.Abstract

  @register: (app) ->
    app.directive @name, @


class AngularCoffeeLoader.Filter extends AngularCoffeeLoader.Abstract

  @register: (app) ->
    app.filter @name, @


class AngularCoffeeLoader.Service extends AngularCoffeeLoader.Abstract

  @register: (app) ->
    app.service @name, @


class AngularCoffeeLoader.Decorator extends AngularCoffeeLoader.Abstract

  @register: (app) ->
    app.config ($provide) ->
      $provide.decorator @name, @

