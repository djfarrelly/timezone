var React = require('react');
var App = require('./views/app.jsx');
var moment = require('moment-timezone');

var timezones = [
  { city: 'New York', tz: 'America/New_York' },
  { city: 'San Antonio', tz: 'America/Chicago' },
  { city: 'San Francisco', tz: 'America/Los_Angeles' },
  { city: 'London', tz: 'Europe/London' }
];

var app = App({
  time: moment( new Date() ),
  timezones: timezones
});

var targetNode = document.body;

React.renderComponent( app, targetNode );