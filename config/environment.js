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
            columnName: "position",
            displayName: "Position",
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
            columnName: "age",
            displayName: "Age",
            type: "Integer",
            sortable: true,
            filterEnabled: true
          },
          {
            columnName: "startDate",
            displayName: "Start Date",
            type: "String",
            sortable: false,
            filterEnabled: false
          },
            {
              columnName: "salary",
              displayName: "Salary",
              type: "String",
              sortable: true,
              filterEnabled: true
            },
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

  return ENV;
};
