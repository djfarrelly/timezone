var express = require('express'),
    app = express(),
    logger = require('morgan'),
    stylus = require('stylus'),
    autoprefixer  = require('autoprefixer-stylus'),
    React = require('react'),
    moment = require('moment-timezone'),
    fs = require('fs');

// Allow direct requiring of .jsx files
require('node-jsx').install({extension: '.jsx'});

// Should switch this out for proper Handlebars usage
function template (body, done) {
  fs.readFile('./app/views/layout.hbs', 'utf8', function (err, layout) {
    if (err) done(err);
    done(null, layout.replace('{{{body}}}', body));
  });
}

app.use(logger());

// Stylus
app.use(
  stylus.middleware({
    src:     __dirname + '/assets',
    dest:    __dirname + '/public',
    compile: function (str, path, fn) {
      return stylus(str)
        .use(autoprefixer())
        .set('filename', path);
        // .set('compress', true);
    }
  })
);

app.get('/', function(err, res){

  var App = require('./app/views/app.jsx');
  var people = require('./app/people.js');

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

  var body = React.renderComponentToString(
    App({
      time: time,
      timezones: timezones
    })
  );

  template(body, function(err, html){
    if (err) throw err;
    res.send(html);
  });

});

// Static files
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000);
