exports.setApp = function(app,
                          getUserIdFromToken,
                          db, ObjectID)
{
  app.get('/user/:userid/subscribedBoards', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    // Convert params from string to number.
    var userId = new ObjectID(req.params.userid);
    if (fromUser == userId) {
      getUserData(userId, function(err, userData){
        if(err){
          //internal error
          res.status(500).send("Database error: "+err);
        }
        else if(userData === null){
          // user not in db
          res.status(400).send("Could not find user data for user: "+ userId);
        }
        else{
          //success -- send data
          res.send(userData);
        }
      });
    } else {
      //unathorized
      res.status(401).end();
    }
  });
  function getUserData(userId, callback){
    db.collection('users').findOne({_id: userId},
      function(err, userData){
        console.log("userData =========================================================================== "+ userData );
        if(err){
          //error report
          callback(err);
        }
        else if(userData === null){
          //User not found
          callback(null,null);
        }
        else{
          //user found -- send back user data in js object
          var subscribedBoards = {
            contents: []
          };
          subscribedBoards.contents = userData.subscribedBoards.map(getBoardData);
          callback(null, subscribedBoards);
        }
    });
  }

  function getBoardData(boardId){
    db.collection('boards').findOne( {_id: boardId},
      function(err, boardData){
        return boardData;
    });
  }
/*
  app.put('/user/:userid/subscribedBoards/:boardid', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));

    var userId = parseInt(req.params.userid, 10);
    var boardId = parseInt(req.params.boardid, 10);

    if (fromUser === userId) {
      var userData = readDocument('users', userId);
      userData.subscribedBoards.push(boardId);
      writeDocument('users', userData);

      var board = readDocument('boards', req.params.boardid);
      board.numUsers++;
      writeDocument('boards', board);

      res.send(userData);
    } else {
      res.status(401).end();
    }
  });

  function getIndex(array, element) {
    for(var i =0; i<array.length; i++){
      if(array[i] == element){
        return i;
      }
    }
  }

  app.delete('/user/:userid/subscribedBoards/:boardid', function(req, res) {
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
