exports.setApp = function(app,
                          getUserIdFromToken,
                          getUser, getBoardData,
                          ObjectID, db)
{
  function getResolvedSubscribedBoards(subscribedBoardsArray, callback){
    var subscribedBoards = {
      contents: []
    }

    function processNextBoard(i){
      getBoardData(subscribedBoardsArray[i], function(err, board) {
        if (err) {
          // Pass an error to the callback.
          callback(err);
        } else {
          // Success!
          subscribedBoards.contents.push(board);
          if (subscribedBoards.contents.length === subscribedBoardsArray.length) {
            // I am the final feed item; all others are resolved.
            // Pass the resolved feed document back to the callback.
            callback(null, subscribedBoards);
          } else {
            // Process the next feed item.
            processNextBoard(i + 1);
          }
        }
      });
    }
    // Special case: board array is empty.
    if (subscribedBoardsArray.length === 0) {
      callback(null, subscribedBoardsArray);
    } else {
      processNextBoard(0);
    }
  }

  app.get('/user/:userid/subscribedBoards', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    // Convert params from string to number.
    var userId = new ObjectID(req.params.userid);
    if (fromUser == userId) {
      getSubscribedBoards(userId, function(err, userData){
        if(err){
          //internal error
          res.status(500).send("Database error: "+err);
        }
        else if(userData === null){
          // user not in db
          res.status(400).send("Could not find user data for user: "+ userId);
        }
        res.status(201).send(userData);
      });
    } else {
      //unathorized
      res.status(401).end();
    }
  });

  function getSubscribedBoards(userId, callback){
    getUser(userId, function(err, userData){
      if(err){
        //internal error
        callback(err);
      }
      else if(userData === null){
        // user not in db
        callback(null, null);
      }
      else{
        //success -- send data
        getResolvedSubscribedBoards(userData.subscribedBoards, function(err, resolvedBoards){
          if(err){
            callback(err);
          }
          else if(resolvedBoards === null){
            callback(null, null);
          }
          callback(null, resolvedBoards);
        });

      }
    });
  }

  function updateSubscribedBoards(userId, boardId, callback){
    db.collection('users').updateOne({_id: userId}, {$push: { subscribedBoards: boardId }}, function(err, results){
      if(err){
        return callback(err);
      }
      else if(results === null){
        return callback(null, null);
      }
      callback(null, results);
    });
  }
  function updateBoardNumUsers(boardId, callback){
    db.collection('boards').updateOne({_id: boardId}, {$inc: {numUsers: 1}}, function(err, result){
      if(err){
        callback(err);
      }
      else if(result === null){
        callback(null,null);
      }
      callback(null, result);
    })
  }

  app.put('/user/:userid/subscribedBoards/:boardid', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));

    var userId = new ObjectID(req.params.userid);
    var boardId = new ObjectID(req.params.boardid);

    if (fromUser == userId) {
      updateSubscribedBoards(userId, boardId, function(err, result){
        if(err){
          res.status(500).send("Database error: "+ err);
        }
        else if (result === null){
          res.status(400).send("Internal error adding board: "+ err);
        }
      });
      updateBoardNumUsers(boardId, function(err, result){
        if(err){
          res.status(500).send("Database error: " + err);
        }
        else if(result === null){
          res.status(400).send("Interal error updating board meta data: "+ err);
        }
      });
      getSubscribedBoards(userId, function(err, result){
        if(err){
          res.status(500).send("Database error: " + err);
        }
        else if(result === null){
          res.status(400).send("Interal error updating board meta data: "+ err);
        }
        res.status(201).send(result);
      });
    } else {
      res.status(401).end();
    }
  });

/*
  a/*pp.delete('/user/:userid/subscribedBoards/:boardid', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));

    var userId = parseInt(req.params.userid, 10);
    var boardId = parseInt(req.params.boardid, 10);

    if (fromUser === userId) {
      var userData = readDocument('users', userId);
      var index = getIndex(userData.subscribedBoards, boardId);
      userData.subscribedBoards.splice(index, 1);
      writeDocument('users', userData);

      var board = readDocument('boards', req.params.boardid);
      board.numUsers--;
      writeDocument('boards', board);

      res.send(userData);
    } else {
      res.status(401).end();
    }
  });
  */
};
