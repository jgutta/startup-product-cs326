exports.setApp = function(app,
                          getUserIdFromToken,
                          readDocument, writeDocument, getThreadSync)
{
  app.get('/user/:userid/pinnedposts', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    // Convert params from string to number.
    var userId = parseInt(req.params.userid, 10);
    if (fromUser === userId) {
      var userData = readDocument('users', userId);
      var pinnedPostsData = readDocument('pinnedPosts', userData.pinnedPosts);

      pinnedPostsData.contents = pinnedPostsData.contents.map(getThreadSync);

      res.send(pinnedPostsData);
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
};
