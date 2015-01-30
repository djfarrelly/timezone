var express = require('express');
var app = express();
var logger = require('morgan');
var stylus = require('stylus');
var autoprefixer  = require('autoprefixer-stylus');
var React = require('react');
var moment = require('moment-timezone');
var fs = require('fs');

var people = require('./people.json');
var transform = require('./app/utils/transform.js');

// Allow direct requiring of .jsx files
require('node-jsx').install({extension: '.jsx'});

// Should switch this out for proper Handlebars usage
function template (body, done) {
  fs.readFile('./app/views/layout.hbs', 'utf8', function (err, layout) {
    if (err) done(err);
    done(null, layout
                .replace('{{{body}}}', body)
                .replace('{{{people}}}', JSON.stringify(people)));
  });
}

app.use(logger('common'));

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

  // Organize into timezones
  var time = moment();
  var timezones = transform(time, people);

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
