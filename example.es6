/* eslint-disable id-match, id-length */
import React from 'react';
import { setupI13n } from 'react-i13n';
import ReactI13nOmniture from './index';
import DemoApp from './demoapp';
const TrackedApp = setupI13n(DemoApp, {
  rootModelData: {
    product: 'Demo App',
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
    prop3: 'web',
  },
  // Set the URL of the Omniture script you want to use.
  externalScript: '//umbobabo.github.io/react-i13n-omniture/assets/omniture_h254.min.js',
  eventHandlers: {
    click: (nodeProps) => {
      // Just a fake manipulation
      return {
        prop13: nodeProps.product,
        prop3: nodeProps.element,
      };
    },
    pageview: (nodeProps) => {
      // Just a fake manipulation
      return {
        prop13: nodeProps.product,
        prop3: nodeProps.element,
      };
    },
  },
}) ]);
export default(<TrackedApp/>);
