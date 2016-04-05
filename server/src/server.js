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

var ThreadSchema = require('./schemas/thread.json');

var validate = require('express-jsonschema').validate;

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

// ====================
// /user/
// ====================

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
app.post('/thread', validate({ body: ThreadSchema }), function(req, res) {
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if (fromUser === body.originalPost.author) {
    /*console.log(body.boards);
    console.log(body.originalPost.author);
    console.log(body.originalPost.title);
    console.log(body.originalPost.date);
    console.log(body.originalPost.time);
    console.log(body.originalPost.img);
    console.log(body.originalPost.description);*/
    if (typeof(body.originalPost.title) !== 'string' || typeof(body.originalPost.description) !== 'string') {
      // 400: Bad request.
      res.status(400).end();
      return;
    }

    var thread = {
      'boards': body.boards,
      'commentsNo': 0,
      'viewsNo': 0,

      'originalPost': {
        'author': body.originalPost.author,
        'title': body.originalPost.title,
        'date': body.originalPost.date,
        'time': body.originalPost.time,
        'img': body.originalPost.img,
        'postDate': new Date().getTime(),
        'description': body.originalPost.description
      },

      'replies': []
    };

    thread = addDocument('threads', thread);

    for(var i in body.boards){
        var board = readDocument('boards', body.boards[i]);
        board.threads.push(thread._id);
        writeDocument('boards', board);
    }

    var threadData = {
      contents: thread
    }

    res.status(201);
    //console.log(threadData);
    res.set('Location', '/threads/' + threadData.contents._id);
    res.send(threadData.contents);
  }
  else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});
// ==========
// /thread
// ==========


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
