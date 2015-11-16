import ReactI13nOmniture from '../index';
import spies from 'chai-spies';

chai.use(spies);

const plugin = new ReactI13nOmniture({
  account: process.env.NODE_ENV === 'production' ? 'economistprod' : 'economistdev',
  initialConfig: {
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
        fakeProps: 'fakeManipulation'
      };
    },
    pageview: (nodeProps) => {
      // Just a fake manipulation
      return {
        fakeProps: 'fakeManipulation'
      };
    },
  },
});

describe('OmniturePlugin is a i13n plugin for Omniture', () => {
  it('it is a class and produce instances', () => {
    ReactI13nOmniture.name.should.equal('OminturePlugin');
    plugin.should.be.an.instanceof(ReactI13nOmniture);
  });
  describe('it provides events interfaces', () => {
    describe('pageview event interface', () => {
      it('it expose a method with 2 arguments that calls a Omniture track method', ()=> {
        // TODO finish the test implementation
        // var pageviewTrack = chai.spy(plugin, 'track');
        // const func = function(){};
        // const payload = {};
        // plugin.pageview(payload, func);
        // debugger;
        // pageviewTrack.should.have.been.called.with({
        //   fakeProps: 'fakeManipulation'
        // }, func);
      });
    });
  });
});
