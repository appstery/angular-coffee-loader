'use strict'

class window.CoffeeAngular

  VERSION = '0.0.0'

  traverse: (o, func) =>
    for i of o
      if o[i] isnt null and typeof (o[i]) is 'object'
        @traverse o[i], func
      else
        func.apply this, [o[i]]

  bootstrap: (@app, @namespace) =>
    @traverse(@namespace, @loadClass)

  loadClass: (klass)  =>
    if klass.prototype instanceof CoffeeAngular.Abstract
      klass.register(@app)
    


class CoffeeAngular.Abstract

  @inject: (args...) ->
    @$inject = args

  constructor: (args...) ->
    for key, index in @constructor.$inject
      @[key] = args[index]

  register: () =>


class CoffeeAngular.Controller extends CoffeeAngular.Abstract

  @register: (app) ->
    app.controller @name, @


class CoffeeAngular.Directive extends CoffeeAngular.Abstract

  @register: (app) ->
    app.directive @name, @


class CoffeeAngular.Filter extends CoffeeAngular.Abstract

  @register: (app) ->
    app.filter @name, @


class CoffeeAngular.Service extends CoffeeAngular.Abstract

  @register: (app) ->
    app.service @name, @


class CoffeeAngular.Decorator extends CoffeeAngular.Abstract

  @register: (app) ->
    app.config ($provide) ->
      $provide.decorator @name, @

