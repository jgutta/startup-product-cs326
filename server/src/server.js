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
var getCollection = database.getCollection;

var bodyParser = require('body-parser');
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(express.static('../client/build/'));

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



// ===================
// /board/
app.get('/board/:boardId', function(req, res){
  var board = readDocument('boards', req.params.boardId);
  //var fromUser = getUserIdFromToken(req.get('Authorization')); Dont think I need this here. What is there to validate by user?
  board.threads = board.threads.map((id) => getThreadSync(id));
  res.send(board);
});

function getThreadSync(threadId) {
  var thread = readDocument('threads', threadId);
  return thread;
}

require('./routes/boards.js').
          setApp(app,
                 getUserIdFromToken,
                 getCollection);

function getBoardData(boardId) {
   var board = readDocument('boards', boardId);
   return board;
}
// ===================


// ====================
// /user/
// ====================
require('./routes/accountsettings.js').
          setApp(app,
                 getUserIdFromToken,
                 readDocument, writeDocument);

// ==========
// /user/:userid/subscribedboards
// ==========

require('./routes/subscribedboards.js').
          setApp(app,
                 getUserIdFromToken,
                 readDocument, writeDocument,
                 getBoardData);

// ==========
// /user/:userid/pinnedposts
// ==========

require('./routes/pinnedposts.js').
          setApp(app,
                 getUserIdFromToken,
                 readDocument, writeDocument, getThreadSync);

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

require('./routes/thread.js').
          setApp(app,
                getUserIdFromToken,
                addDocument, readDocument, writeDocument);



// ==========
// /thread
// ==========

// ==========
// /feed
// ==========

app.get('/feed/:userid/', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Convert params from string to number.
  var userId = parseInt(req.params.userid, 10);
  if (fromUser === userId || userId === 2) {
    var userData = readDocument('users', userId);
    var feedData = readDocument('feeds', userData.feed);

    feedData.contents = feedData.contents.map(getThreadSync);

    res.send(feedData)
  } else {
    res.status(401).end();
  }
});

// ==========
// /search
// ==========
app.post('/search', function(req, res) {
  if (typeof(req.body) === 'string') {
    // trim() removes whitespace before and after the query.
    // toLowerCase() makes the query lowercase.
    var queryText = req.body.trim().toLowerCase();
    // Search the user's feed.

    var threads = getCollection('threads');

    var threadsData = [];

    for(var i in threads) {
      var th = threads[i];
      th.boards = th.boards.map(getBoardData);
      var userData = readDocument('users', th.originalPost.author);
      th.originalPost.authorName = userData.username;
      threadsData.push(th);
    }

    // "filter" is like "map" in that it is a magic method for
    // arrays. It takes an anonymous function, which it calls
    // with each item in the array. If that function returns 'true',
    // it will include the item in a return array. Otherwise, it will
    // not.
    // Here, we use filter to return only feedItems that contain the
    // query text.
    // Since the array contains feed item IDs, we later map the filtered
    // IDs to actual feed item objects.
    var searchResults = {
      contents: []
    };

    searchResults.contents = threadsData.filter((thread) => {
      var threadDescription = thread.originalPost.description;
      return threadDescription.toLowerCase().indexOf(queryText) !== -1;
    });

    res.send(searchResults);
  } else {
    // 400: Bad Request.
    res.status(400).end();
  }
});

/**
 * Translate JSON Schema Validation failures into error 400s.
 */
app.use(function(err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
    // Set a bad request http response status
    res.status(400).end();
  } else {
    // It's some other sort of error; pass it to next error middleware handler
    next(err);
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
