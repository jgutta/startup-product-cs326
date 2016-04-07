var replySchema = require('../schemas/reply.json');

var validate = require('express-jsonschema').validate;

exports.setApp = function(app,getUserIdFromToken, addDocument, readDocument, writeDocument)
{
  function getBoardSync(boardId) {
    var board = readDocument('boards', boardId);
    return board;
  }

  function getReplySync(replyId) {
      var reply = readDocument('replies', replyId);

     var user = readDocument('users', reply.author);
     reply.authorUsername = user.username;
     reply.authorImage = user.image;
      reply.replies = reply.replies.map(getReplySync);
      return reply;
    }

  function getFullThreadSync(threadId){
    var thread = readDocument('threads', threadId);
    var user = readDocument('users', thread.originalPost.author);
    thread.originalPost.authorUsername = user.username;
    thread.boards = thread.boards.map(getBoardSync);
    thread.replies = thread.replies.map(getReplySync);
    return thread;
  }

  //getThreadData
  app.get('/thread/:threadId', function(req, res){
    var threadId = req.params.threadId;
    var thread = getFullThreadSync(threadId);
     var threadData = {
       contents: thread
     };
     res.status(201);
     res.send(threadData);
  });

  app.post('/thread/:threadId/replyto', validate({ body: replySchema }), function(req, res){
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if (fromUser === body.author) {
      if(typeof(body.contents) !== 'string'){
        // 400: Bad request.
        res.status(400).end();
        return;
      }
      var threadId = req.params.threadId;
      var thread = readDocument('threads', threadId);
      var rep = {
        'author': body.author,
        'postDate': body.postDate,
        'contents': body.contents,
        'replies': []
      };
      rep = addDocument('replies', rep);
      //push current replyId to thread.replies
      thread.replies.push(rep._id);
      writeDocument('threads', thread);
      var fullThread = getFullThreadSync(threadId);
         var threadData = {
           contents: fullThread
         };

         res.status(201);
         res.send(threadData);
    }


    else {
      // 401: Unauthorized.
      res.status(401).end();
    }

  });

  app.post('/thread/:threadId/replyto/:replyId', validate({ body: replySchema }), function(req, res){
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if (fromUser === body.author) {
      if(typeof(body.contents) !== 'string'){
        // 400: Bad request.
        res.status(400).end();
        return;
      }
      var threadId = req.params.threadId;
      var replyId = req.params.replyId;
      var thread = readDocument('threads', threadId);
      var reply = readDocument('replies', replyId);
      var rep = {
        'author': body.author,
        'postDate': body.postDate,
        'contents': body.contents,
        'replies': []
      };
      rep = addDocument('replies', rep);
      reply.replies.push(rep._id);
      writeDocument('replies', reply);
      writeDocument('threads', thread);
      var fullThread = getFullThreadSync(threadId);
      var threadData = {
        contents: fullThread
      };
      res.status(201);
      res.send(threadData);
    }

    else {
      // 401: Unauthorized.
      res.status(401).end();
    }

  });
};

/*
var thread = readDocument('threads', threadId);
var reply = readDocument('replies', replyId);
var rep = {
  'author': author,
  'postDate': new Date().getTime(),
  'contents': contents,
  'replies': []
}
rep = addDocument('replies', rep);
reply.replies.push(rep._id);
writeDocument('replies', reply);
writeDocument('threads', thread);
var fullThread = getFullThreadSync(threadId);
var threadData = {
  contents: fullThread
};
emulateServerReturn(threadData, cb);
*/

/*var thread = readDocument('threads', threadId);
var rep = {
  'author': author,
  'postDate': new Date().getTime(),
  'contents': contents,
  'replies': []
}
rep = addDocument('replies', rep);
//push current replyId to thread.replies
thread.replies.push(rep._id);
writeDocument('threads', thread);
var fullThread = getFullThreadSync(threadId);
   var threadData = {
     contents: fullThread
   };
emulateServerReturn(threadData, cb); */
