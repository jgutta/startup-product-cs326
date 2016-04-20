var MessageSchema = require('../schemas/message.json');

var validate = require('express-jsonschema').validate;

exports.setApp = function(app,
                          getUserIdFromToken,
                          db, ObjectID,
                          getUser)
{
  function getMessageData(message, callback) {
    db.collection('users').findOne({
      _id: message.author
    }, function(err, user) {
      if (err) {
        return callback(err);
      } else if (user === null) {
        return callback(null, null);
      }

      message.authorUsername = user.username;

      callback(null, message)
    });
  }

  function getConversation(conversationId, userId, callback) {
    db.collection('conversations').findOne({
      _id: conversationId
    }, function(err, conversation) {
      if (err) {
        return callback(err);
      } else if (conversation === null) {
        return callback(null, null);
      }

      for(var i = conversation.users.length - 1; i >= 0; i--) {
        // == because object vs string
        if(conversation.users[i] == userId) {
          conversation.users.splice(i, 1);
        }
      }

      getUser(conversation.users[0], function(err, user) {
        conversation.user = user;

        var resolvedContents = [];

        function processNextMessage(i) {
          getMessageData(conversation.messages[i], function(err, message) {
            if (err) {
              callback(err);
            } else {
              resolvedContents.push(message);
              if (resolvedContents.length === conversation.messages.length) {
                conversation.messages = resolvedContents;
                callback(null, conversation);
              } else {
                processNextMessage(i + 1);
              }
            }
          });
        }

        if (conversation.messages.length === 0) {
          callback(null, conversation);
        } else {
          processNextMessage(0);
        }
      });
    });
  }

  function compareConversations(convA, convB) {
    // If there are no messages in the conversation, set the time of that conversation to 0.
    var timeA = convA.messages.length < 1 ? 0 : convA.messages[convA.messages.length - 1].postDate;
    var timeB = convB.messages.length < 1 ? 0 : convB.messages[convB.messages.length - 1].postDate;

    return timeB - timeA;
  }

  function getConversations(userId, callback) {
    getUser(new ObjectID(userId), function(err, user) {
      var conversationsData = {
        contents: []
      };

      var resolvedContents = [];

      function processNextConversation(i) {
        getConversation(user.conversations[i], userId, function(err, conversation) {
          if (err) {
            callback(err);
          } else {
            resolvedContents.push(conversation);
            if (resolvedContents.length === user.conversations.length) {
              conversationsData.contents = resolvedContents;
              conversationsData.contents.sort(compareConversations);

              callback(null, conversationsData);
            } else {
              processNextConversation(i + 1);
            }
          }
        });
      }

      if (user.conversations.length === 0) {
        callback(null, feedData);
      } else {
        processNextConversation(0);
      }
    });
  }

  app.get('/user/:userid/conversation', function(req, res) {
    var userid = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if (fromUser === userid) {
      getConversations(userid, function(err, conversationsData) {
        res.send(conversationsData);
      });
    } else {
      res.status(401).end();
    }
  });

  app.get('/user/:userid/conversation/:conversationid', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var conversationId = req.params.conversationid;
    var userId = req.params.userid;
    if (fromUser === userId) {
      getConversation(new ObjectID(conversationId), new ObjectID(userId), function(err, conversation) {
        var conversationData = {};
        conversationData.conversation = conversation;
        res.send(conversationData);
      });
    } else {
      res.status(401).end();
    }
  });

  function postMessage(conversationId, author, title, contents, callback) {
    var newMessage = {
      'author': author,
      'title': title,
      'postDate': new Date().getTime(),
      'contents': contents
    };

    db.collection('conversations').updateOne(
      { _id: conversationId },
      { $push: { messages: newMessage }},
      function(err, result) {
        if (err) {
          return callback(err);
        }

        getConversation(conversationId, author, function(err, conversation) {
          callback(null, conversation)
        });
      }
    );
  }

  app.post('/user/:userid/conversation/:conversationid', validate({ body: MessageSchema }), function(req, res) {
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));

    var userId = req.params.userid;
    var conversationId = req.params.conversationid;

    if (fromUser === body.author && fromUser === userId) {
      postMessage(new ObjectID(conversationId), new ObjectID(body.author), body.title, body.contents, function(err, conversation) {
        res.status(201);
        res.send(conversation);
      });
    } else {
      res.status(401).end();
    }
  });
};
