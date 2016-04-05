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

var CreateThread = require('./schemas/createthread.json')
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

function getMessageData(message) {
  message.authorUsername = readDocument('users', message.author).username;
  return message;
}

function getConversationData(user, conversationId) {
  var conversation = readDocument('conversations', conversationId);

  conversation.messages = conversation.messages.map(getMessageData);

  for(var i = conversation.users.length - 1; i >= 0; i--) {
    if(conversation.users[i] === user) {
      conversation.users.splice(i, 1);
    }
  }
  conversation.user = readDocument('users', conversation.users[0]);

  return conversation;
}

function compareConversations(convA, convB) {
  // If there are no messages in the conversation, set the time of that conversation to 0.
  var timeA = convA.messages.length < 1 ? 0 : convA.messages[convA.messages.length - 1].postDate;
  var timeB = convB.messages.length < 1 ? 0 : convB.messages[convB.messages.length - 1].postDate;

  return timeB - timeA;
}

function getConversations(user) {
  var userData = readDocument('users', user);

  var conversationsData = {
    contents: []
  };
  conversationsData.contents = userData.conversations.map((conversation) => getConversationData(user, conversation));

  conversationsData.contents.sort(compareConversations);

  return conversationsData;
}

app.get('/user/:userid/conversation', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var useridNumber = parseInt(userid, 10);
  if (fromUser === useridNumber) {
    res.send(getConversations(useridNumber));
  } else {
    res.status(401).end();
  }
});

// ====================
// /thread/
// ====================

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

// Starts the server on port 3000!
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
