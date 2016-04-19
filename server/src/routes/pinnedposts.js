var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/UBoard';
exports.setApp = function(app,
                          getUserIdFromToken,
                          readDocument, writeDocument, getThread)
{
MongoClient.connect(url, function(err, db) {


  function getPinnedData(userID, callback) {
    db.collection('users').findOne({
      _id: userID
    }, function(err, userData) {
      if (err) {
        return callback(err);
      } else if (userData === null) {
        return callback(null, null);
      }
      db.collection('pinnedPosts').findOne({
        _id: userData.pinnedPosts
      }, function(err, pinnedData) {
        if (err) {
          return callback(err);
        } else if (pinnedData === null) {
          return callback(null, null);
        }

      // We will place all of the resolved PinnedPosts here.
      // When done, we will put them into the Feed object
      // and send the Feed to the client.
      var Contents = [];

      // processNextFeedItem is like an asynchronous for loop:
      // It performs processing on one feed item, and then triggers
      // processing the next item once the first one completes.
      // When all of the feed items are processed, it completes
      // a final action: Sending the response to the client.
      function processNextPost(i) {
        // Asynchronously resolve a feed item.
        getThread(pinnedData.contents[i], function(err, thread) {
          if (err) {
            // Pass an error to the callback.
            callback(err);
          } else {
            // Success!
            Contents.push(thread);
            if (Contents.length === pinnedData.contents.length) {
              // I am the final feed item; all others are resolved.
              // Pass the resolved feed document back to the callback.
              pinnedData.contents = Contents;
              callback(null, pinnedData);
            } else {
              // Process the next feed item.
              processNextPost(i + 1);
            }
          }
        });
      }

      // Special case: Feed is empty.
      if (pinnedData.contents.length === 0) {
        callback(null, pinnedData);
      } else {
        processNextPost(0);
      }
    });
  });
  }



  app.get('/user/:userid/pinnedposts', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    // Convert params from string to number.
    var userId = req.params.userid
    if (fromUser === userId) {
      getPinnedData(new ObjectID(userId), function(err, pinnedData){
        if (err) {
         // A database error happened.
         // Internal Error: 500.
         res.status(500).send("Database error: " + err);
       } else if (pinnedData === null) {
         // Couldn't find the feed in the database.
         res.status(400).send("Could not look up Pinned Posts for user " + userId);
       } else {
         // Send data.
         res.send(pinnedData);
       }
     }); //pinnedData includes the ID, so for this function we only send back contents
    } else {
      res.status(401).end();
    }
  });

    app.get('/user/:userid/pinnedposts2', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    // Convert params from string to number.
    var userId = parseInt(req.params.userid, 10);
    if (fromUser === userId) {
      var userData = readDocument('users', userId);
      var pinnedPostsData = readDocument('pinnedPosts', userData.pinnedPosts);

      res.send(pinnedPostsData);
    } else {
      res.status(401).end();
    }
  });

  app.put('/user/:userid/pinnedposts/:threadid', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));

    var userId = parseInt(req.params.userid, 10);
    var threadId = parseInt(req.params.threadid, 10);

    if (fromUser === userId) {
      var userData = readDocument('users', userId);
      var pinned = readDocument('pinnedPosts', userData.pinnedPosts);
      pinned.contents.push(threadId);
      writeDocument('pinnedPosts', pinned);

      res.send(pinned);
    } else {
      res.status(401).end();
    }
  });

  app.delete('/user/:userid/pinnedposts/:threadid', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));

    var userId = parseInt(req.params.userid, 10);
    var threadId = parseInt(req.params.boardid, 10);

    if (fromUser === userId) {
      var userData = readDocument('users', userId);
      var pinnedPostsData = readDocument('pinnedPosts', userData.pinnedPosts);
      var index = pinnedPostsData.contents.indexOf(threadId);
      console.log(index);
      pinnedPostsData.contents.splice(index, 1);
      writeDocument('pinnedPosts', pinnedPostsData);

      res.send(pinnedPostsData);
    } else {
      res.status(401).end();
    }
  });


}); //End of mongo brace
};//setApp brace
