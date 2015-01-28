var React  = require('react');
var moment = require('moment-timezone');

var App = React.createFactory(require('./views/app.jsx'));

var people = window.people;

// The global time:
var time = moment();

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


// Add the component to the DOM
var targetNode = document.querySelector('#app');

React.render(
  App({
    time: time,
    timezones: timezones
  }),
  targetNode
);


var KEY = {
  LEFT:  37,
  RIGHT: 39
};

// Listen to keyup for timechange
window.addEventListener('keyup', function(e){

  if (e.keyCode === KEY.RIGHT){
    time.add(1, 'h');
  } else if (e.keyCode === KEY.LEFT){
    time.subtract(1, 'h');
  }

  // Push new data to re-render component
  React.render(
    App({
      time: time,
      timezones: timezones
    }),
    targetNode
  );

});

// Check every 10 seconds for an updated time
setInterval(function(){

  var now = moment();
  if (now.minute() === time.minute()) return;

  time.minute( now.minute() );

  React.render(
    App({
      time: time,
      timezones: timezones
    }),
    targetNode
  );

}, 1000 * 10);
