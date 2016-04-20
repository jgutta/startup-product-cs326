exports.setApp = function(app, getUserIdFromToken, getCollection){
  app.get("/boards/", function (req, res){

        var boards = getCollection('boards');
        var boardsData = {
          boardsList: []
        };
        for(var i in boards){
          boardsData.boardsList.push(boards[i]);
        }
        res.send(boardsData);
  });
}
