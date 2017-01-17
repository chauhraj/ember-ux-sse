/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-ux-sse',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      "event-sse": {
        origin: "http://localhost:8000",
        "configuration": [{
        origin: "http://localhost:8000",
        eventName: "Employee",
        eventType: "update"
      },
      ]},
      dataTables : {
        "main-table": [
          {
            columnName: "name",
            displayName: "Name",
            type: "String",
            sortable: true,
            filterEnabled: true
          },
          {
            columnName: "office",
            displayName: "Office",
            type: "String",
            sortable: true,
            filterEnabled: true
          },
          {
            columnName: "position",
            displayName: "Position",
            type: "String",
            sortable: true,
            filterEnabled: true
          },
          {
            columnName: "age",
            displayName: "Age",
            type: "Number",
            sortable: true,
            filterEnabled: true
          },
          {
            columnName: "salary",
            displayName: "Salary",
            type: "string",
            sortable: true,
            filterEnabled: true
          },
          {
            columnName: "startDate",
            displayName: "Start Date",
            type: "string",
            sortable: false,
            filterEnabled: false
          }
        ],
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV.contentSecurityPolicy = {
  // Deny everything by default
  'default-src': "'none'",

  // Allow scripts at https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js
  'script-src': ["'self'", "'unsafe-inline'"],

  // Allow fonts to be loaded from http://fonts.gstatic.com
  'font-src': ["'self'", "http://fonts.gstatic.com"],

  // Allow data (xhr/websocket) from api.mixpanel.com and custom-api.local
  'connect-src': ["'self'", "http://localhost:8000", "http://localhost:4200"],

  // Allow images from the origin itself (i.e. current domain)
  'img-src': "'self'",

  // Allow CSS loaded from https://fonts.googleapis.com
  'style-src': ["'self'", "'unsafe-inline'"],

  // Omit `media-src` from policy
  // Browser will fallback to default-src for media resources (which is 'none', see above)
  'media-src': null
  }
  return ENV;
};
