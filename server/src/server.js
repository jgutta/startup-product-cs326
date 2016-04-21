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

var ResetDatabase = require('./resetdatabase');

var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');

var asyn = require('async');

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/UBoard';

MongoClient.connect(url, function(err, db) {
  app.use(bodyParser.text());
  app.use(bodyParser.json());

  app.use(express.static('../client/build/'));

  app.use('/mongo_express', mongo_express(mongo_express_config));

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
      // Check that id is a string.
      if (typeof id === 'string') {
        return id;
      } else {
        // Not a number. Return "", an invalid ID.
        return "";
      }
    } catch (e) {
      // Return an invalid ID.
      return -1;
    }
  }

  function getUser(userId, callback) {
    db.collection('users').findOne({
      _id: userId
    }, function(err, user) {
      if (err) {
        return callback(err);
      } else if (user === null) {
        return callback(null, null);
      }
      callback(null, user)
    });
  }


  // ===================
  // /board/
  app.get('/board/:boardId', function(req, res){
    gatherBoardData(req.params.boardId, function(err, boardData){
      if(err){
         res.status(500).send("Database Boards error: " + err);
      }else if (boardData === null) {
         res.status(400).send("Could not look up board " + req.params.boardId);
      } else {
        res.send(boardData);
      }

    });
  });

  function gatherBoardData(boardID, callback) {
    db.collection('boards').findOne({
      _id: new ObjectID(boardID)
    }, function(err, boardData) {
      if (err) {
        return callback(err);
      } else if (boardData === null) {
        return callback(null, null);
      }
      var threadHolder = [];
      function amalgomate(i){
        getThreadAuth(boardData.threads[i], function(err, fullThread){
          if(err){
            return callback(err);
          }
          else if(fullThread === null){
            return callback(null, boardData)
          }
          else{
            threadHolder.push(fullThread);
            if(threadHolder.length === boardData.threads.length){
              boardData.threads = threadHolder;
              callback(null, boardData);
            }
            else{
              amalgomate(i + 1);
            }
          }
        });
      }
      if (boardData.threads.length === 0) {
        callback(null, boardData);
      } else {
        amalgomate(0);
      }

    });
    }

    function getThreadAuth(threadId, callback) {
      db.collection('threads').findOne({
        _id: threadId
      }, function(err, thread) {
        if (err) {
          return callback(err);
        } else if (thread === null) {
          return callback(null, null);
        }
        getUser(thread.originalPost.author, function(err, userData){
          if(err){
            return callback(err);
          }
          else if(userData === null){
            return callback(null,null);
          }
          else{
            thread.originalPost.author = userData;
            callback(null,thread);
          }
        });
      });
    }
  function getThread(threadId, callback) {
    db.collection('threads').findOne({
      _id: threadId
    }, function(err, thread) {
      if (err) {
        return callback(err);
      } else if (thread === null) {
        return callback(null, null);
      }

      callback(null, thread)
    });
  }

  function getBoardData(boardId, callback) {
    db.collection('boards').findOne( {_id: boardId},
      function(err, boardData){
        if(err){
          return callback(err);
        }
        else if(boardData === null){
          return callback(null, null);
        }
        callback(null, boardData);
    });
  }

  function getAllBoards(callback){
    var boardsData = {// We chose to hardcode the board ids, because only the admins(us) have the ability to create new boards.
      boardsList: [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003"),
                  new ObjectID("000000000000000000000004"), new ObjectID("000000000000000000000005"), new ObjectID("000000000000000000000006"),
                  new ObjectID("000000000000000000000007"), new ObjectID("000000000000000000000008"), new ObjectID("000000000000000000000009"),
                  new ObjectID("000000000000000000000010"), new ObjectID("000000000000000000000011")]
    };
    function createArrayOfBoards(i){
      getBoardData(boardsData.boardsList[i], function(err, board){
        if(err){
          //error
          return callback(err);
        }else{
          //success -- add board to array
          boardsData.boardsList[i] = board;
          if(i === 10){
            //last board was just added, send complete array back
            callback(null, boardsData);
          }else{
            createArrayOfBoards(i+1);
          }
        }
      });
    }
    //1 is the first board id
    createArrayOfBoards(0);

  }

  require('./routes/boards.js').
            setApp(app, getAllBoards);

  // ===================


  // ====================
  // /user/
  // ====================
  require('./routes/accountsettings.js').
            setApp(app,
                   getUserIdFromToken,
                   readDocument, writeDocument, db, ObjectID);

  // ==========
  // /user/:userid/subscribedboards
  // ==========

  require('./routes/subscribedboards.js').
            setApp(app,
                   getUserIdFromToken,
                   getUser, getBoardData,
                   ObjectID, db);

  // ==========
  // /user/:userid/pinnedposts
  // ==========

  require('./routes/pinnedposts.js').
            setApp(app,
                   getUserIdFromToken,
                   readDocument, writeDocument, getThread);

  // ==========
  // /user/:userid/conversation
  // ==========

  require('./routes/messaging.js').
            setApp(app,
                   getUserIdFromToken,
                   db, ObjectID,
                   getUser);

  // ====================
  // /thread/
  // ====================

  require('./routes/createthread.js').
            setApp(app,
                   getUserIdFromToken,
                   addDocument, readDocument, writeDocument,
                   db, ObjectID);

  require('./routes/thread.js').
            setApp(app,
                   getUserIdFromToken,
                   db, ObjectID);



  // ==========
  // /thread
  // ==========

  // ==========
  // /feed
  // ==========

  function getFeedData(feedId, callback) {
    db.collection('feeds').findOne({
      _id: feedId
    }, function(err, feedData) {
      if (err) {
        return callback(err);
      } else if (feedData === null) {
        return callback(null, null);
      }

      // We will place all of the resolved FeedItems here.
      // When done, we will put them into the Feed object
      // and send the Feed to the client.
      var resolvedContents = [];

      // processNextFeedItem is like an asynchronous for loop:
      // It performs processing on one feed item, and then triggers
      // processing the next item once the first one completes.
      // When all of the feed items are processed, it completes
      // a final action: Sending the response to the client.
      function processNextThread(i) {
        // Asynchronously resolve a feed item.
        getThread(feedData.contents[i], function(err, thread) {
          if (err) {
            // Pass an error to the callback.
            callback(err);
          } else {
            // Success!
            resolvedContents.push(thread);
            if (resolvedContents.length === feedData.contents.length) {
              // I am the final feed item; all others are resolved.
              // Pass the resolved feed document back to the callback.
              feedData.contents = resolvedContents;
              callback(null, feedData);
            } else {
              // Process the next feed item.
              processNextThread(i + 1);
            }
          }
        });
      }

      // Special case: Feed is empty.
      if (feedData.contents.length === 0) {
        callback(null, feedData);
      } else {
        processNextThread(0);
      }
    });
  }


  app.get('/feed/:userid/', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = req.params.userid;
    if (fromUser === userId || userId === '000000000000000000000002') {
      getUser(new ObjectID(userId), function(err, user) {
        getFeedData(user.feed, function(err, feedData) {
          if(err){
            res.status(500).end();
          }
          else{
            res.send(feedData);
          }
        });
      });
    } else {
      res.status(401).end();
    }
  });

  // ==========
  // /search
  // ==========

  // app.post('/search', function(req, res) {
  //   if (typeof(req.body) === 'string') {
  //     // trim() removes whitespace before and after the query.
  //     // toLowerCase() makes the query lowercase.
  //     var queryText = req.body.trim().toLowerCase();
  //     // Search the user's feed.
  //
  //     var threads = getCollection('threads');
  //     db.collection('threads').find().toArray(function(err, threads) {
  //     });
  //
  //     var threadsData = [];
  //
  //     for(var i in threads) {
  //       var th = threads[i];
  //       th.boards = th.boards.map(getBoardData);
  //// th.boards = asyn.map(th.boards, getBoardData, function(err, result){});
  //       //var userData = readDocument('users', th.originalPost.author);
  //       db.collection('users').findOne({_id: th.originalPost.author
  //       }, function(err, userData) {
  //         th.originalPost.authorName = userData.username;
  //         threadsData.push(th);
  //       })
  //     }
  //
  //     // "filter" is like "map" in that it is a magic method for
  //     // arrays. It takes an anonymous function, which it calls
  //     // with each item in the array. If that function returns 'true',
  //     // it will include the item in a return array. Otherwise, it will
  //     // not.
  //     // Here, we use filter to return only feedItems that contain the
  //     // query text.
  //     // Since the array contains feed item IDs, we later map the filtered
  //     // IDs to actual feed item objects.
  //     var searchResults = {
  //       contents: []
  //     };
  //
  //     searchResults.contents = threadsData.filter((thread) => {
  //       var threadDescription = thread.originalPost.description;
  //       return threadDescription.toLowerCase().indexOf(queryText) !== -1;
  //     });
  //
  //     res.send(searchResults);
  //   } else {
  //     // 400: Bad Request.
  //     res.status(400).end();
  //   }
  // });
app.post('/search', function(req, res) {
  if (typeof(req.body) === 'string') {
    // trim() removes whitespace before and after the query.
    // toLowerCase() makes the query lowercase.
    var queryText = req.body.trim().toLowerCase();

        db.collection('threads').find({
          $text: {
            $search: queryText
          }
        }).toArray(function(err, items) {
          if (err) {
            return err;
          }
          var threadsData = {
            contents: []
          };

        for(var i in items) {
            var th = items[i];

          console.log(th.boards);

        asyn.map(th.boards,
            getBoardData, function(err, result){
              for(var j in result){
                console.log(result[j].name)
                items[i].boards[j] = result[j].name;
                console.log(items[i].boards[j])
              }
          });
          //items[i] = th;
        }
          console.log(items);
          threadsData.contents = items;
          // threadsData.contents.boards = asyn.map(threadsData.contents.boards ,
          //   getBoardData, function(err, result){
          //
          //   console.log(threadsData.contents.boards);
          // });

          res.send(threadsData);
        });
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

  // Reset the database.
  app.post('/resetdb', function(req, res) {
    console.log("Resetting database...");
    ResetDatabase(db, function() {
      res.send();
    });
  });


  // Starts the server on port 3000!
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
});
// The file ends here. Nothing should be after this.
