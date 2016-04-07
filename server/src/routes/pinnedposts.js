exports.setApp = function(app,
                          getUserIdFromToken,
                          readDocument, writeDocument)
{
  app.get('/user/:userid/pinnedposts', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    // Convert params from string to number.
    var userId = parseInt(req.params.userid, 10);
    if (fromUser === userId) {
      var userData = readDocument('users', userId);
      var subscribedBoards = {
        contents: []
      };
      subscribedBoards.contents = userData.subscribedBoards.map(getBoardData);

      res.send(subscribedBoards);
    } else {
      res.status(401).end();
    }
  });

  app.put('/user/:userid/pinnedposts/:threadid', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));

    var userId = parseInt(req.params.userid, 10);
    var boardId = parseInt(req.params.boardid, 10);

    if (fromUser === userId) {
      var userData = readDocument('users', userId);
      userData.subscribedBoards.push(boardId);
      writeDocument('users', userData);

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

  app.delete('/user/:userid/pinnedposts/:threadid', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));

    var userId = parseInt(req.params.userid, 10);
    var boardId = parseInt(req.params.boardid, 10);

    if (fromUser === userId) {
      var userData = readDocument('users', userId);
      var index = getIndex(userData.subscribedBoards, boardId);
      userData.subscribedBoards.splice(index, 1);
      writeDocument('users', userData);

      res.send(userData);
    } else {
      res.status(401).end();
    }
  });
};
