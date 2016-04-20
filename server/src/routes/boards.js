exports.setApp = function(app, getAllBoards){
  app.get("/boards/", function (req, res){
    getAllBoards(function(err, boardsData){
      if(err){
        res.status(500).send("database error, couldn't find board: "+err);
      }
      else if(boardsData === null){
        res.status(400).send("internal error when finding all boards: "+ err);
      }
      res.status(201).send(boardsData);
    });
  });
}
