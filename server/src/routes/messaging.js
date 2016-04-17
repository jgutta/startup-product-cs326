var MessageSchema = require('../schemas/message.json');

var validate = require('express-jsonschema').validate;

exports.setApp = function(app,
                          getUserIdFromToken,
                          readDocument, writeDocument)
{
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
    if (fromUser === userid) {
      res.send(getConversations(userid));
    } else {
      res.status(401).end();
    }
  });

  app.get('/user/:userid/conversation/:conversationid', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var conversationId = req.params.conversationid;
    var userId = req.params.userid;
    if (fromUser === userId) {
      var conversationData = {};
      conversationData.conversation = getConversationData(userId, conversationId);
      res.send(conversationData)
    } else {
      res.status(401).end();
    }
  });

  function postMessage(conversationId, author, title, contents) {
    var conversation = readDocument('conversations', conversationId);
    conversation.messages.push({
      'author': author,
      'title': title,
      'postDate': new Date().getTime(),
      'contents': contents
    });

    writeDocument('conversations', conversation);

    return getConversationData(author, conversationId);
  }

  app.post('/user/:userid/conversation/:conversationid', validate({ body: MessageSchema }), function(req, res) {
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));

    var userId = req.params.userid;
    var conversationId = req.params.conversationid;

    if (fromUser === body.author && fromUser === userId) {
      var newMessage = postMessage(conversationId, body.author, body.title, body.contents);
      res.status(201);
      res.send(newMessage);
    } else {
      res.status(401).end();
    }
  });
};
