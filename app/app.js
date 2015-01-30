var React  = require('react');
var moment = require('moment-timezone');

var transform = require('./utils/transform.js');
var App = React.createFactory(require('./views/app.jsx'));


// Organize into timezones
var time = moment();
var timezones = transform(time, window.people);

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

function reRender() {

  var now = moment();
  if (now.hour() === time.hour() && now.minute() === time.minute()) return;

  time.hour( now.hour() );
  time.minute( now.minute() );

  React.render(
    App({
      time: time,
      timezones: timezones
    }),
    targetNode
  );

}

// Check every 10 seconds for an updated time
setInterval(reRender, 1000 * 10);

// Check on window focus
window.onfocus = reRender;
