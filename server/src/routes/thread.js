var replySchema = require('../schemas/reply.json');
var validate = require('express-jsonschema').validate;
var ObjectID = require('mongodb').ObjectID;

exports.setApp = function(app,getUserIdFromToken, addDocument, readDocument, writeDocument, db)
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
      //console.log('777');
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
      console.log(getReplySync);
      console.log(replyId);
      console.log(callback);
      db.collection('replies').findOne({
        _id: replyId
      }, function(err, reply) {
        if (err) {
          console.log('err 1');
          return callback(err);
        } else if (reply === null) {
          console.log('err 2');
          return callback(null, null);
        }
        db.collection('users').findOne({
          _id: reply.author
        }, function(err, user) {
          if (err) {
            console.log('err 11');
            return callback(err);
          } else if (user === null) {
            console.log('err 22');
            return callback(null, null);
          }
          console.log("update reps");
          db.collection('replies').updateOne(
            { _id: replyId },
            { $set: { authorUsername: user.username } },
            { $set: { authorImage: user.image } },
            { $set: { replies: reply.replies.map(getReplySync) } },
            function(err, result) {
              if (err) {
                return callback(err);
              } else if (result === null) {
                return callback(null, null);
              }
              console.log("result:");
              console.log(result);
              callback(null, result);
            }
          );

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
          //console.log("flag 5");
          return callback(err);
        } else if (user === null) {
          //console.log("flag 6");
          return callback(null, null);
        }
        //console.log("888");
        db.collection('threads').updateOne(
          { _id: threadId },
          { $set: { originalPost: {authorUsername: user.username} } },
          { $set: { boards: thread.boards.map(getBoardSync) } },
          { $set: {replies: thread.replies.map(getReplySync)} },
          function(err, thread) {
            console.log("flag !");
            if (err) {
              console.log("flag !!");
              return callback(err);
            } else if (thread === null) {
              console.log("flag !!!");
              return callback(null, null);
            }
            console.log("flag !-V");
            callback(null, thread);
          }
        );
        });
    }
    );
  }

  //getFullThreadData
  app.get('/thread/:threadId', function(req, res){
    var threadId = req.params.threadId;
    //console.log(threadId);
    var thread = getFullThread(new ObjectID(threadId), function(error, threadData){
      res.send(threadData);
    });
     var threadData = {
       contents: thread
     };
     res.status(201);
     res.send(threadData);
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
