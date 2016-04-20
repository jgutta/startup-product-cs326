exports.setApp = function(app,
                          getUserIdFromToken,
                          getUser, getResolvedSubscribedBoards,
                          ObjectID)
{
  app.get('/user/:userid/subscribedBoards', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    // Convert params from string to number.
    var userId = new ObjectID(req.params.userid);
    if (fromUser == userId) {
      getUser(userId, function(err, userData){
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
          getResolvedSubscribedBoards(userData.subscribedBoards, function(err, resolvedBoards){
            if(err){
              res.status(500).send("Database error: "+err);
            }
            else if(resolvedBoards === null){
              res.status(400).send("Subscribed boards error, can't find: "+ err);
            }
            res.send(resolvedBoards);
          });

        }
      });
    } else {
      //unathorized
      res.status(401).end();
    }
  });

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
