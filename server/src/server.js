// Implement your server in this file.
// We should be able to run your server with node src/server.js

// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();

var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;

var bodyParser = require('body-parser');
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(express.static('../client/build'));

/**
 * Get the user ID from a token. Returns -1 (an invalid ID) if it fails.
 */
function getUserIdFromToken(authorizationLine) {
  try {
    // Cut off "Bearer " from the header value.
    var token = authorizationLine.slice(7);
    // Convert the base64 string to a UTF-8 string.
    var regularString = new Buffer(token, 'base64').toString('utf8');
    // Convert the UTF-8 string into a JavaScript object.
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj['id'];
    // Check that id is a number.
    if (typeof id === 'number') {
      return id;
    } else {
      // Not a number. Return -1, an invalid ID.
      return -1;
    }
  } catch (e) {
    // Return an invalid ID.
    return -1;
  }
}

// Defines what happens when it receives the `GET /` request
app.get('/', function (req, res) {
  res.send('Welcome to UBoard!');
});

function getBoardData(boardId) {
  var board = readDocument('boards', boardId);
  return board;
}

// ====================
// /user/
// ====================

// ==========
// /user/:userid/subscribedboards
// ==========

require('./routes/subscribedboards.js').
          setApp(app,
                 getUserIdFromToken,
                 readDocument, writeDocument,
                 getBoardData);

// ==========
// /user/:userid/conversation
// ==========

require('./routes/messaging.js').
          setApp(app,
                 getUserIdFromToken,
                 readDocument, writeDocument);

// ====================
// /thread/
// ====================

require('./routes/createthread.js').
          setApp(app,
                getUserIdFromToken,
                addDocument, readDocument, writeDocument);

// ==========
// /thread
// ==========

// ==========
// /search
// ==========

app.post('/search', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  console.log(fromUser);
  var user = readDocument('users', fromUser);
  if (typeof(req.body) === 'string') {
    // trim() removes whitespace before and after the query.
    // toLowerCase() makes the query lowercase.
    var queryText = req.body.trim().toLowerCase();
    // Search the user's feed.
    var feedItemIDs = readDocument('feeds', user.feed).contents;
    // "filter" is like "map" in that it is a magic method for
    // arrays. It takes an anonymous function, which it calls
    // with each item in the array. If that function returns 'true',
    // it will include the item in a return array. Otherwise, it will
    // not.
    // Here, we use filter to return only feedItems that contain the
    // query text.
    // Since the array contains feed item IDs, we later map the filtered
    // IDs to actual feed item objects.
    res.send(feedItemIDs.filter((feedItemID) => {
      var feedItem = readDocument('feedItems', feedItemID);
      return feedItem.contents.contents.toLowerCase().indexOf(queryText) !== -1;
    }).map(getFeedItemSync));
  } else {
    // 400: Bad Request.
    res.status(400).end();
  }
});


// Reset database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  // This is a debug route, so don't do any validation.
  database.resetDatabase();
  // res.send() sends an empty response with status code 200
  res.send();
});


// Starts the server on port 3000!
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
