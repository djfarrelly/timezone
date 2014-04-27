var React  = require('react'),
    moment = require('moment-timezone');

var App = require('./views/app.jsx');

// The global time:
var time = moment();

// The people and their timezones
var people = [
  {
    name: 'Dan',
    avatar: 'https://d389zggrogs7qo.cloudfront.net/images/team/dan.jpg',
    city: 'San Antonio',
    tz: 'America/Chicago'
  },
  {
    name: 'Niel',
    avatar: 'https://d389zggrogs7qo.cloudfront.net/images/team/niel.jpg',
    city: 'Cape Town',
    tz: 'Africa/Johannesburg'
  },
  {
    name: 'Sunil',
    avatar: 'https://d389zggrogs7qo.cloudfront.net/images/team/sunil.png',
    city: 'San Francisco',
    tz: 'America/Los_Angeles'
  },
  {
    name: 'Zach',
    avatar: 'https://d389zggrogs7qo.cloudfront.net/images/team/zach.jpg',
    city: 'Superior, CO',
    tz: 'America/Denver'
  },
  {
    name: 'Joel',
    avatar: 'https://d389zggrogs7qo.cloudfront.net/images/team/joel.png',
    city: 'Cape Town',
    tz: 'Africa/Johannesburg'
  },
  {
    name: 'Brian',
    avatar: 'https://d389zggrogs7qo.cloudfront.net/images/team/brian.png',
    city: 'Waco',
    tz: 'America/Chicago'
  },
  {
    name: 'Andy',
    avatar: 'https://d389zggrogs7qo.cloudfront.net/images/team/andy.jpg',
    city: 'San Francisco',
    tz: 'America/Los_Angeles'
  },
];


function appendTime(person) {
  person.time = moment( time ).tz( person.tz );
}

function sortByTimezone(a, b){
  return a.time.zone() - b.time.zone();
}

// Append a moment date to each person
people.forEach(appendTime);
people.sort(sortByTimezone);


// Organize into timezones
var timezones = {};

people.forEach(function(person){
  var offset = person.time.zone();
  if ( !timezones[ offset ] ) timezones[ offset ] = [];
  timezones[ offset ].push( person );
});


var app = App({
  time: time,
  timezones: timezones
});

window.app = app;


// Testing updating the UI
// setInterval(function() {
//   app.setProps({ time: time.add('minute', 1) });
// }, 1000);


var targetNode = document.querySelector('#app');

React.renderComponent( app, targetNode );