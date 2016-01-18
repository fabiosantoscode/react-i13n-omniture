'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _promisescript = require('promisescript');

var _promisescript2 = _interopRequireDefault(_promisescript);

var OminturePlugin = (function () {
  function OminturePlugin(config) {
    _classCallCheck(this, OminturePlugin);

    this.config = config;
  }

  OminturePlugin.prototype.ensureScriptHasLoaded = function ensureScriptHasLoaded() {
    var _this = this;

    if (!this.script) {
      this.script = _promisescript2['default']({
        url: this.config.externalScript,
        type: 'script'
      }).then(function () {
        if (typeof window === 'undefined' || !window.s_gi) {
          return false;
        }
        var props = {};
        for (var i = 1; i < 50; ++i) {
          props['prop' + i] = '';
        }
        _this.trackingObject = Object.assign(window.s_gi(_this.config.account), _this.config.initialProps);
      })['catch'](function (e) {
        console.error('An error loading or executing Omniture has occured: ', e.message);
      });
    }
    return this.script;
  };

  OminturePlugin.prototype.generatePayload = function generatePayload(payload, eventName) {
    var eventHandler = this.config.eventHandlers[eventName];
    var props = {};

    if (payload && payload.i13nNode && payload.i13nNode.getMergedModel) {
      props = Object.assign(payload, payload.i13nNode.getMergedModel());
    }
    if (eventHandler) {
      return eventHandler(props);
    }
    return props;
  };

  /* eslint-disable no-unused-vars */

  OminturePlugin.prototype.pageview = function pageview(payload, callback) {
    var _this2 = this;

    return this.ensureScriptHasLoaded().then(function () {
      return _this2.track(_this2.generatePayload(payload, 'pageview'), callback);
    });
  };

  OminturePlugin.prototype.click = function click(payload, callback) {
    var _this3 = this;

    return this.ensureScriptHasLoaded().then(function () {
      return _this3.trackLink(_this3.generatePayload(payload, 'click'), callback);
    });
  };

  OminturePlugin.prototype.track = function track(additionalTrackingProps, callback) {
    var newTrackingObject = Object.assign(this.trackingObject, additionalTrackingProps);
    // `t` is Omniture's Track function.
    var omnitureTrackingPixel = newTrackingObject.t();
    if (omnitureTrackingPixel && typeof window !== 'undefined' && window.document) {
      window.document.write(omnitureTrackingPixel);
    }
    return Promise.resolve().then(callback);
  };

  OminturePlugin.prototype.trackLink = function trackLink(additionalTrackingProps, callback) {
    var _this4 = this;

    return new Promise(function (resolve) {
      var newTrackingObject = Object.assign(_this4.trackingObject, additionalTrackingProps);
      // LinkType and linkName are mandatory.
      if (!newTrackingObject.linkType || !newTrackingObject.linkName) {
        // Prevent errot for old browsers.
        if (typeof console === "undefined") {
          console = {
            log: function log() {}
          };
        }
        console.log('LinkType and linkName are mandatory and should be provided.');
      } else {
        // `tl` is Omniture's TrackLink function.
        newTrackingObject.tl(true, newTrackingObject.linkType, newTrackingObject.linkName, newTrackingObject.variableOverrides, function () {
          if (callback) {
            callback();
          }
          resolve();
        });
      }
    });
  };

  _createClass(OminturePlugin, [{
    key: 'eventHandlers',
    get: function get() {
      return {
        click: this.click.bind(this),
        pageview: this.pageview.bind(this)
      };
    }
  }]);

  return OminturePlugin;
})();

exports['default'] = OminturePlugin;
;
module.exports = exports['default'];