(function() {
  'use strict';
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.AngularCoffeeLoader = (function() {
    var VERSION;

    function AngularCoffeeLoader() {
      this.loadClass = __bind(this.loadClass, this);
      this.bootstrap = __bind(this.bootstrap, this);
      this.traverse = __bind(this.traverse, this);
    }

    VERSION = '0.0.1';

    AngularCoffeeLoader.prototype.traverse = function(o, func) {
      var i, _results;
      _results = [];
      for (i in o) {
        if (o[i] !== null && typeof o[i] === 'object') {
          _results.push(this.traverse(o[i], func));
        } else {
          _results.push(func.apply(this, [o[i]]));
        }
      }
      return _results;
    };

    AngularCoffeeLoader.prototype.bootstrap = function(app, namespace) {
      this.app = app;
      this.namespace = namespace;
      return this.traverse(this.namespace, this.loadClass);
    };

    AngularCoffeeLoader.prototype.loadClass = function(klass) {
      if (klass.prototype instanceof AngularCoffeeLoader.Abstract) {
        return klass.register(this.app);
      }
    };

    return AngularCoffeeLoader;

  })();

  AngularCoffeeLoader.Abstract = (function() {
    Abstract.inject = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.$inject = args;
    };

    function Abstract() {
      var args, index, key, _i, _len, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.register = __bind(this.register, this);
      _ref = this.constructor.$inject;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        key = _ref[index];
        this[key] = args[index];
      }
    }

    Abstract.prototype.register = function() {};

    return Abstract;

  })();

  AngularCoffeeLoader.Controller = (function(_super) {
    __extends(Controller, _super);

    function Controller() {
      return Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.register = function(app) {
      return app.controller(this.name, this);
    };

    return Controller;

  })(AngularCoffeeLoader.Abstract);

  AngularCoffeeLoader.Directive = (function(_super) {
    __extends(Directive, _super);

    function Directive() {
      return Directive.__super__.constructor.apply(this, arguments);
    }

    Directive.register = function(app) {
      return app.directive(this.name, this);
    };

    return Directive;

  })(AngularCoffeeLoader.Abstract);

  AngularCoffeeLoader.Filter = (function(_super) {
    __extends(Filter, _super);

    function Filter() {
      return Filter.__super__.constructor.apply(this, arguments);
    }

    Filter.register = function(app) {
      return app.filter(this.name, this);
    };

    return Filter;

  })(AngularCoffeeLoader.Abstract);

  AngularCoffeeLoader.Service = (function(_super) {
    __extends(Service, _super);

    function Service() {
      return Service.__super__.constructor.apply(this, arguments);
    }

    Service.register = function(app) {
      return app.service(this.name, this);
    };

    return Service;

  })(AngularCoffeeLoader.Abstract);

  AngularCoffeeLoader.Decorator = (function(_super) {
    __extends(Decorator, _super);

    function Decorator() {
      return Decorator.__super__.constructor.apply(this, arguments);
    }

    Decorator.register = function(app) {
      return app.config(function($provide) {
        return $provide.decorator(this.name, this);
      });
    };

    return Decorator;

  })(AngularCoffeeLoader.Abstract);

}).call(this);
