var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');


var app = express();

app.use('/', express.static('./'));

app.listen(9000, function(){
  console.log('app here');
});
