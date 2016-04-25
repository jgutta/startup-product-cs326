var UserSchema = require('../schemas/accountsettings.json');

var validate = require('express-jsonschema').validate;
var asynce = require("async");

exports.setApp = function(app,
  getUserIdFromToken,
  readDocument, writeDocument, db, ObjectID)

{
  // function sendDatabaseError(res, err) {
  //   res.status(500).send("A database error occurred: " + err);
  // }

  function getUserData(userId, callback) {
    db.collection('users').findOne({
      _id: userId
    }, function(err, user) {
      if (err) {
        return callback(err);
      } else if (user === null) {
        return callback(null, null);
      }
      asynce.map(user.blockedUsers, getBlockedUserSync, function(err, results){
        if (err){
          callback(err);
        }else{
          user.blockedUsers = results;
          callback(null, user);
        }
      });
    });
  }

  app.get('/user/:userid', function(req, res) {
    var userid = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = new ObjectID(userid);
    if (fromUser === userid) {
      getUserData(userId, function(err, user) {
        if(err){
         res.status(500).send("Database user error: " + err);
      }else if (user === null) {
         res.status(400).send("Could not look up user " + userid);
      } else {
        res.send(user);
      }

      });
    } else {
      res.status(401).end();
    }
  });


  function getBlockedUserSync(userId, callback) {
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

    app.put('/user/:userid/', validate({
      body: UserSchema
    }), function(req, res) {
      var userid = req.params.userid;
      var fromUser = getUserIdFromToken(req.get('Authorization'));

      //var useridNumber = parseInt(userid, 10);
      if (fromUser === userid) {
        var userData = req.body;
        var userId = new ObjectID(userid);
        db.collection('users').updateOne({
            _id: userId
          }, {
            $set: {
              "username": userData.username,
              "gender": userData.gender,
              "password": userData.password,
              "blockedUsers": userData.blockedUsers.map((user) => new ObjectID(user._id)),
              "email": userData.email,
              "emailset": userData.emailset,
              "image": userData.image
            }
          }, function(err, result) {
            if (err) {
              return res.status(500).send("Database user error: " + err);
            } else if (result === null) {
              // Could not find the specified feed item. Perhaps it does not exist, or
              // is not authored by the user.
              // 400: Bad request.
              return res.status(400).end();
            }else{
                res.send(result);

            }
          });

      } else {
        res.status(401).end();
      }
    });


    function unBlock(user, blockedUser, callback) {
      db.collection('users').updateOne({_id: user},
        {
          $pull:{
          blockedUsers: new ObjectID(blockedUser)
        }
      }, function(err) {
      if (err) {
        return callback(err);
      } else if (user === null) {
        return callback(null, null);
      }
      callback(null, user);
    });
}

    app.delete('/user/:id/blockedusers/:userid', function(req, res) {
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      var userid = req.params.id;
      var blockedId = req.params.userid;
      if(fromUser === userid){
        unBlock(new ObjectID(userid), new ObjectID(blockedId), function(err, user){
          if(err){
            res.status(500).send("Database user error: " + err);
          }else if (userid === null) {
             res.status(400).send("Could not look up user " + userid);
           }else if (blockedId === null) {
              res.status(400).send("Could not look up blockeduser " + blockedId);
           }else {
             getUserData(user, function(err, userId) {
               if(err){
                res.status(500).send("Database user error: " + err);
             }else if (userId === null) {
                res.status(400).send("Could not look up user " + userid);
             } else {
               res.send(userId);
             }

             });
           }
        });
      } else {
        res.status(401).end();
      }
    });
  };
