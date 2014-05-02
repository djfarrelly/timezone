var express = require('express'),
    app     = express(),
    logger  = require('morgan'),
    stylus  = require('stylus');

app.use(logger());

// Stylus
app.use(
  stylus.middleware({
    src:     __dirname + '/assets',
    dest:    __dirname + '/public',
    compile: function (str, path, fn) {
      return stylus(str)
        .set('filename', path)
        .set('compress', true);
    }
  })
);

// Static files
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000);