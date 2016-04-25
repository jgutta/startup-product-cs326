var replySchema = require('../schemas/reply.json');
var validate = require('express-jsonschema').validate;
//var ObjectID = require('mongodb').ObjectID;

exports.setApp = function( app, getUserIdFromToken, db, ObjectID )
{

  function getBoardSync(boardId, callback) {
    db.collection('boards').findOne({
      _id: boardId
    }, function(err, board) {
      if (err) {
        return callback(err);
      } else if (board === null) {
        return callback(null, null);
      }
      //console.log('666');
      //console.log(callback);
      //console.log(board);
      callback(null, board)
    });
  }

  function getReplySync(replyId, callback) {
     /*
     var reply = readDocument('replies', replyId);
     var user = readDocument('users', reply.author);
     reply.authorUsername: = user.username;
     reply.authorImage = user.image;
      reply.replies = reply.replies.map(getReplySync);
      return reply; */
      db.collection('replies').findOne({
        _id: replyId
      }, function(err, reply) {
        if (err) {
          return callback(err);
        } else if (reply === null) {
          return callback(null, null);
        }
        db.collection('users').findOne({
          _id: reply.author
        }, function(err, user) {
          if (err) {
            return callback(err);
          } else if (user === null) {
            return callback(null, null);
          }
          reply.authorUsername = user.username;
          reply.authorImage = user.image;
          reply.replies = reply.replies.map(getReplySync);
          //console.log(reply.replies);
          callback(null, reply);

          });

        });
    }

  function getFullThread(threadId, callback){
    /*
    var thread = readDocument('threads', threadId);
    var user = readDocument('users', thread.originalPost.author);
    thread.originalPost.authorUsername = user.username;
    thread.boards = thread.boards.map(getBoardSync);
    thread.replies = thread.replies.map(getReplySync);
    return thread; */
    console.log(callback);
    db.collection('threads').findOne({
      _id: threadId
    }, function(err, thread) {
      //console.log("flagOne");
      if (err) {
        //console.log("flag 2");
        return callback(err);
      } else if (thread === null) {
        //console.log("flag 3");
        return callback(null, null);
      }
      //console.log("flag 4");
      db.collection('users').findOne({
        _id: thread.originalPost.author
      }, function(err, user) {
        if (err) {
          return callback(err);
        } else if (user === null) {
          return callback(null, null);
        }
        console.log("1");
        thread.originalPost.authorUsername = user.username;
        console.log("2");
        thread.boards = thread.boards.map(getBoardSync);
        console.log("3");
        thread.replies = thread.replies.map(getReplySync);
        console.log("4");
        console.log(callback);
        console.log(thread);
        callback(null, thread);
        });
    }
    );
  }

  //getFullThreadData
  app.get('/thread/:threadId', function(req, res){
    var threadId = req.params.threadId;

    getFullThread(new ObjectID(threadId), function(error, threadData){
      if(error){
         res.status(500).send("database error, couldn't find thread: " + error);
      }
      else if(threadData == null){
        res.status(400).send("internal error: "+ error);
      }
      res.send(threadData);
    });

  });

  //for posting replies to OP
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
      thread.commentsNo = thread.commentsNo + 1;
      writeDocument('threads', thread);
      var fullThread = getFullThread(threadId);
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

  //for posting replies to replies
  app.post('/thread/:threadId/replyto/:replyId/sub', validate({ body: replySchema }), function(req, res){
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
      thread.commentsNo = thread.commentsNo + 1;
      writeDocument('threads', thread);
      var fullThread = getFullThread(threadId);
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
