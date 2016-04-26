var replySchema = require('../schemas/reply.json');
var validate = require('express-jsonschema').validate;
//var ObjectID = require('mongodb').ObjectID;

exports.setApp = function( app, getUserIdFromToken, db, ObjectID, asyn, getUser )
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

  function getReply(replyId, callback) {
    db.collection('replies').findOne({
      _id: replyId
    }, function(err, reply) {
      if (err) {
        return callback(err);
      } else if (reply === null) {
        return callback(null, null);
      }

      getUser(reply.author, function(err, user) {
	reply.authorUsername = user.username;
	reply.authorImage = user.image;

	asyn.map(reply.replies, getReply, function(err, resolvedItems) {
	  reply.replies = resolvedItems;
	  callback(null, reply)
	});
      });
    });
  }

  function getFullThread(threadId, callback){
    db.collection('threads').findOne({
      _id: threadId
    }, function(err, thread) {
      if (err) {
        return callback(err);
      } else if (thread === null) {
        return callback(null, null);
      }
      getUser(thread.originalPost.author, function(err, user) {
         thread.originalPost.authorUsername = user.username;

      asyn.map(thread.replies, getReply, function(err, resolvedItems) {
      thread.replies = resolvedItems;
      callback(null, thread)
         });
      });
      });
      }



  //getFullThreadData
  //getFullThreadData
   app.get('/thread/:threadId', function(req, res){
     var threadId = req.params.threadId;

    getFullThread(new ObjectID(threadId), function(error, thread){
       if(error){
        res.status(500).send("database error, couldn't find board: " + error);
       }

      else if(threadData === null){
         res.status(400).send("internal error: "+ error);
       }
       else{

	var threadData = {
    contents: thread
	}

	res.send(threadData);
      }
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
