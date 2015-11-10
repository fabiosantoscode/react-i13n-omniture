/* eslint-disable id-match, id-length */
import React from 'react';
import { setupI13n } from 'react-i13n';
import ReactI13nOmniture from './index';
import DemoApp from './demoapp';
import slug from 'slug';
// import cookie from '@economist/cookie';

slug.defaults.mode ='pretty';
slug.defaults.modes['rfc3986'] = {
    replacement: '_',      // replace spaces with replacement
    symbols: true,         // replace unicode symbols or not
    remove: /[.]/g,
    lower: true,           // result in lower case
    charmap: slug.charmap, // replace special characters
    multicharmap: slug.multicharmap // replace multi-characters
};
slug.defaults.modes['pretty'] = {
    replacement: '_',
    symbols: true,
    remove: /[.]/g,
    lower: true,
    charmap: slug.charmap,
    multicharmap: slug.multicharmap
};
import User from '@economist/user';
import OmnitureUtils from './OmnitureUtils';

const TrackedApp = setupI13n(DemoApp, {
  rootModelData: {
    product: 'The World If',
  },
  isViewportEnabled: true,
}, [ new ReactI13nOmniture({
  account: process.env.NODE_ENV === 'production' ? 'economistprod' : 'economistdev',
  initialProps: {
    visitorNamespace: 'economist',
    trackingServer: 'stats.economist.com',
    trackingServerSecure: 'sstats.economist.com',
    dc: '122',
    linkTrackVars: [
      'pageName',
      'channel',
      'events',
      'prop1',
      'prop3',
      'prop4',
      'prop5',
      'prop11',
      'prop13',
      'prop14',
      'prop31',
      'prop34',
      'prop40',
      'prop41',
      'prop42',
      'prop46',
      'contextData.subsection',
    ].join(''),
    server: (typeof document !== 'undefined') ? document.location.hostname : '',
    // web or print, They depend by the source of the articles.
    prop3: 'print',
    eVar3: 'print',
    // DFP Site
    prop41: 'fmsq',
    eVar41: 'fmsq',
    // DFP Zone
    prop42: 'dewi',
    eVar42: 'dewi',
  },
  // Set the URL of the Omniture script you want to use.
  externalScript: '//umbobabo.github.io/react-i13n-omniture/assets/omniture_h254.min.js',
  eventHandlers: {
    click: (nodeProps) => {
      // Just a fake manipulation
      return {
        linkType: nodeProps.product,
        linkName: nodeProps.element,
      };
    },
    pageview: (nodeProps) => {
      // World In configuration
      // prop1 is "the_world_if" for all pages (currently the world if section page prop 1 has "homepage"
      // prop 2 should have issue date in the format of the rest of the site.
      // prop3 is web
      // prop4 - homepage should be "section|home"
      // prop5 ONLY populates for content - articles, blogs, graphs, etc. Not for home page.
      // Is prop 13 can be populated it would be helpful to overall tracking. this is the cookie reading to identify who users on the site are.

      // Override default values
      let articleSource = {};
      if(nodeProps.articleSource){
        articleSource = {
          prop3: nodeProps.articleSource,
          eVar3: nodeProps.articleSource,
        }
      }
      // template: 'article' or 'section|home'
      // topic: e.g. 'Politics';
      // Enforce with default values for nodeProps
      nodeProps = {
        product: '',
        topic: '',
        title: '',
        template: '',
        ...nodeProps,
      };
      return {
        channel: slug(nodeProps.product),
        pageName: [ slug(nodeProps.product),  slug(nodeProps.template), slug((nodeProps.topic!='') ? nodeProps.topic : nodeProps.product), slug(nodeProps.title) ].join('|'),
        pageURL: location.href,
        contextData: {
          subsection: slug(nodeProps.topic)
        },
        prop1: slug(nodeProps.product),
        prop4: slug(nodeProps.template),
        prop5: nodeProps.title,
        prop6: OmnitureUtils.graphShot(),
        prop8: OmnitureUtils.hourOfTheDay(),
        prop10: OmnitureUtils.fullDate(),
        prop11: User.isLoggedIn() ? "logged_in" : "not_logged_in",
        prop13: OmnitureUtils.userType(),
        prop31: OmnitureUtils.articlePublishDate(nodeProps.publishDate),
        prop32: location.href,
        prop34: OmnitureUtils.deviceDetection(),
        prop40: nodeProps.userID,
        prop46: OmnitureUtils.mulIP(),
        prop53: OmnitureUtils.subscriptionRemaningMonths(),
        prop54: OmnitureUtils.subscriptionInfo(),
        eVar1: slug(nodeProps.product),
        eVar4: slug(nodeProps.template),
        eVar5: nodeProps.title,
        eVar6: OmnitureUtils.graphShot(),
        eVar34: OmnitureUtils.deviceDetection(),
        eVar8: OmnitureUtils.hourOfTheDay(),
        eVar10: OmnitureUtils.fullDate(),
        eVar11: User.isLoggedIn() ? "logged_in" : "not_logged_in",
        eVar13: OmnitureUtils.userType(),
        eVar31: OmnitureUtils.articlePublishDate(nodeProps.publishDate),
        eVar32: location.href,
        eVar40: nodeProps.userID,
        ...articleSource
      };
    },
  },
}) ]);
export default(<TrackedApp/>);
