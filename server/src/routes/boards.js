exports.setApp = function(app, getUserIdFromToken, getCollection){
  app.get("/boards/", function (req, res){
    //var fromUser = getUserIdFromToken(req.get('Authorized'))
  //  var userId = parseInt(req.params.userid, 10);
    //if(fromUser === userId){
        //Success
        var boards = getCollection('boards');
        var boardsData = {
          boardsList: []
        };
        for(var i in boards){
          boardsData.boardsList.push(boards[i]);
        }
        res.send(boardsData);
    //}
    //else{
      //bad authentication, could not connect
      //res.status(401).end();
    //}
  });
}
