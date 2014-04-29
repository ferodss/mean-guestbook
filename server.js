'use strict';

// BASE SETUP
// ============================================================================

var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Message    = require('./app/models/message');
var app        = express();

// connect to the database
mongoose.connect('mongodb://localhost/guestbook');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

// serve statci files in /public directory
app.use(express.static(__dirname + '/public'));

// set our port
var port = process.env.PORT || 3000;

// ANGULAR ROUTE
// =============================================================================

// A router to handle all angular requests
var defaultRouter = express.Router();
defaultRouter.route('/').get(function(req, res) {
    res.sendfile('./public/index.html');
});

app.use('/', defaultRouter);

// START THE SERVER
// =============================================================================

app.listen(port);
console.log('Magic happens on port ' + port);
