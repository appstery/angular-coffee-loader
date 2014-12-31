(function() {
  'use strict';
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  describe("Different type of class registration", function() {
    return it("class extends AngularCoffeeLoader.Controller", function() {
      var Sample, app, l;
      Sample = {};
      Sample.SimpleController = (function(_super) {
        __extends(SimpleController, _super);

        function SimpleController() {
          this.register = __bind(this.register, this);
          return SimpleController.__super__.constructor.apply(this, arguments);
        }

        SimpleController.inject('$scope');

        SimpleController.prototype.register = function(app) {
          console.log('test register');
          return SimpleController.__super__.register.apply(this, arguments);
        };

        return SimpleController;

      })(AngularCoffeeLoader.Controller);
      app = angular.module('sample', []);
      l = new AngularCoffeeLoader();
      l.bootstrap(app, Sample);
      angular.bootstrap(document, ['sample']);
      return expect(app._invokeQueue[0].length).toBe(3);
    });
  });

}).call(this);
