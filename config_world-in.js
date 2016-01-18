'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _slug = require('slug');

var _slug2 = _interopRequireDefault(_slug);

var _economistUser = require('@economist/user');

var _economistUser2 = _interopRequireDefault(_economistUser);

var _OmnitureUtils = require('./OmnitureUtils');

var _OmnitureUtils2 = _interopRequireDefault(_OmnitureUtils);

_slug2['default'].defaults.mode = 'pretty';
_slug2['default'].defaults.modes['rfc3986'] = {
  replacement: '_', // replace spaces with replacement
  symbols: true, // replace unicode symbols or not
  remove: /[.]/g,
  lower: true, // result in lower case
  charmap: _slug2['default'].charmap, // replace special characters
  multicharmap: _slug2['default'].multicharmap // replace multi-characters
};
_slug2['default'].defaults.modes['pretty'] = {
  replacement: '_',
  symbols: true,
  remove: /[.]/g,
  lower: true,
  charmap: _slug2['default'].charmap,
  multicharmap: _slug2['default'].multicharmap
};

var OmnitureConfig = {
  account: process.env.NODE_ENV === 'production' ? 'economistprod' : 'economistdev',
  initialProps: {
    visitorNamespace: 'economist',
    trackingServer: 'stats.economist.com',
    trackingServerSecure: 'sstats.economist.com',
    dc: '122',
    linkTrackVars: ['pageName', 'channel', 'events', 'prop1', 'prop3', 'prop4', 'prop5', 'prop11', 'prop13', 'prop14', 'prop31', 'prop34', 'prop40', 'prop41', 'prop42', 'prop46', 'contextData.subsection'].join(''),
    server: typeof document !== 'undefined' ? document.location.hostname : '',
    // web or print, They depend by the source of the articles.
    prop3: 'print',
    eVar3: 'print',
    // DFP Site
    prop41: 'fmsq',
    eVar41: 'fmsq',
    // DFP Zone
    prop42: 'dewi',
    eVar42: 'dewi'
  },
  // Set the URL of the Omniture script you want to use.
  externalScript: '//umbobabo.github.io/react-i13n-omniture/assets/omniture_h254.min.js',
  eventHandlers: {
    click: function click(nodeProps) {
      // Just a fake manipulation
      return {
        linkType: nodeProps.product,
        linkName: nodeProps.element
      };
    },
    pageview: function pageview(nodeProps) {
      // World In configuration
      // prop1 is "the_world_if" for all pages (currently the world if section page prop 1 has "homepage"
      // prop 2 should have issue date in the format of the rest of the site.
      // prop3 is web
      // prop4 - homepage should be "section|home"
      // prop5 ONLY populates for content - articles, blogs, graphs, etc. Not for home page.
      // Is prop 13 can be populated it would be helpful to overall tracking. this is the cookie reading to identify who users on the site are.

      // Override default values
      var articleSource = {};
      if (nodeProps.articleSource) {
        articleSource = {
          prop3: nodeProps.articleSource,
          eVar3: nodeProps.articleSource
        };
      }
      // template: 'article' or 'section|home'
      // topic: e.g. 'Politics';
      // Enforce with default values for nodeProps
      nodeProps = _extends({
        product: '',
        topic: '',
        title: '',
        template: ''
      }, nodeProps);
      return _extends({
        channel: _slug2['default'](nodeProps.product),
        pageName: [_slug2['default'](nodeProps.product), _slug2['default'](nodeProps.template), _slug2['default'](nodeProps.topic != '' ? nodeProps.topic : nodeProps.product), _slug2['default'](nodeProps.title)].join('|'),
        pageURL: location.href,
        contextData: {
          subsection: _slug2['default'](nodeProps.topic)
        },
        prop1: _slug2['default'](nodeProps.product),
        prop4: _slug2['default'](nodeProps.template),
        prop5: nodeProps.title,
        prop6: _OmnitureUtils2['default'].graphShot(),
        prop8: _OmnitureUtils2['default'].hourOfTheDay(),
        prop10: _OmnitureUtils2['default'].fullDate(),
        prop11: _economistUser2['default'].isLoggedIn() ? "logged_in" : "not_logged_in",
        prop13: _OmnitureUtils2['default'].userType(),
        prop31: _OmnitureUtils2['default'].articlePublishDate(nodeProps.publishDate),
        prop32: location.href,
        prop34: _OmnitureUtils2['default'].deviceDetection(),
        prop40: nodeProps.userID,
        prop46: _OmnitureUtils2['default'].mulIP(),
        prop53: _OmnitureUtils2['default'].subscriptionRemaningMonths(),
        prop54: _OmnitureUtils2['default'].subscriptionInfo(),
        eVar1: _slug2['default'](nodeProps.product),
        eVar4: _slug2['default'](nodeProps.template),
        eVar5: nodeProps.title,
        eVar6: _OmnitureUtils2['default'].graphShot(),
        eVar34: _OmnitureUtils2['default'].deviceDetection(),
        eVar8: _OmnitureUtils2['default'].hourOfTheDay(),
        eVar10: _OmnitureUtils2['default'].fullDate(),
        eVar11: _economistUser2['default'].isLoggedIn() ? "logged_in" : "not_logged_in",
        eVar13: _OmnitureUtils2['default'].userType(),
        eVar31: _OmnitureUtils2['default'].articlePublishDate(nodeProps.publishDate),
        eVar32: location.href,
        eVar40: nodeProps.userID
      }, articleSource);
    }
  }
};
exports['default'] = OmnitureConfig;
module.exports = exports['default'];