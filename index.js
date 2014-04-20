var express = require('express');
var app = express();
var logger = require('morgan');

app.use(logger());
app.use(express.static(__dirname + '/public'));

// app.get('/', function(req, res){
//   res.send('hello world');
// });

app.listen(3000);