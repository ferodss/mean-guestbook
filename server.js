'use strict';

// BASE SETUP
// ============================================================================

var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Message    = require('./app/models/message');
var app        = express();

// Load message model
var Message = require('./app/models/message');

// connect to the database
mongoose.connect('mongodb://localhost/guestbook');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

// serve static files in /public directory
app.use(express.static(__dirname + '/public'));

// set our port
var port = process.env.PORT || 3000;

// API ROUTES
// ============================================================================

// get an instance of the express Router
var router = express.Router();

// setup messages routes
router.route('/messages')
    // GET /api/messages to get a list of messages
    .get(function(req, res) {
        Message.find(function(err, messages) {
            if (err) {
                res.send(err);
            }

            res.json(messages);
        });
    })
    // POST /api/messages to create a new message
    .post(function(req, res) {
        var message    = new Message();
        message.author = req.body.author;
        message.body   = req.body.body;
        message.date   = Date.now();

        // Save the message an check for errors
        message.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.json({
                message: 'Message created!',
                data: message
            });
        });
    });

// register all API routes prefixed with /api
app.use('/api', router);

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
