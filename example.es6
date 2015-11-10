// Pagename
// All page names should follow the same format
// <product>|<template>|<topic_category>|<title>
// the_work_if|<template>|<topic_category>|<title>
// eg —
// "homepage" becomes "the_world_if|section||home" (NOT homepage)
// (note when there is not topic it is left blank but both pipes are there.
// --> "the_world_if|article|politics|the_peril_beyond_putin"
// prop1 is "the_world_if" for all pages (currently the world if section page prop 1 has "homepage"
// prop 2 should have issue date in the format of the rest of the site.
// prop3 is web
// prop4 - homepage should be "section|home"
// prop5 ONLY populates for content - articles, blogs, graphs, etc. Not for home page.
// Is prop 13 can be populated it would be helpful to overall tracking. this is the cookie reading to identify who users on the site are.

// Formatting
// String
// no spaces, caps or special characters
// Date
// the_world_if_yyyymmdd

/* eslint-disable id-match, id-length */
import React from 'react';
import { setupI13n } from 'react-i13n';
import ReactI13nOmniture from './index';
import DemoApp from './demoapp';
import slug from 'slug';
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
    // prop3 is web
    prop3: 'web',
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

      // template: 'article' or 'section|home'
      // topic: e.g. 'Politics';

      // Enforce with default values for nodeProps
      nodeProps = {
        product: '',
        topic: '',
        title: '',
        template: '',
        ...nodeProps,
      }
      return {
        pageName: [ slug(nodeProps.product), slug(nodeProps.topic), slug(nodeProps.title) ].join('|'),
        pageURL: location.href,
        prop1: slug(nodeProps.product),
        prop4: slug(nodeProps.template),
        prop5: nodeProps.title,
        prop11: User.isLoggedIn() ? "logged_in" : "not_logged_in",
        prop12: User.isLoggedIn(),
        prop32: location.href,
      };
    },
  },
}) ]);
export default(<TrackedApp/>);
