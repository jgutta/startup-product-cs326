var UserSchema = require('../schemas/accountsettings.json');

var validate = require('express-jsonschema').validate;
var async = require("async");

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
      async.map(user.blockedUsers, getBlockedUserSync, function(err, results){
        console.log("inside map");
        if (err){
          callback(err);
        }else{
          console.log(user);
          user.blockedUsers = results;
          callback(null, user)
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

  function updateUserData(userId, username, gender, password, blocked, email, emailset, image) {
    var userData = readDocument('users', userId);
    userData.username = username;
    userData.gender = gender;
    userData.password = password;
    userData.blockedUsers = blocked.map((user) => {return user._id});
    userData.email = email;
    userData.emailset = emailset;
    userData.image = image;
    writeDocument('users', userData);
    return userData;


    }

    app.put('/user/:userid/', validate({
      body: UserSchema
    }), function(req, res) {
      var userid = req.params.userid;
      var fromUser = getUserIdFromToken(req.get('Authorization'));

      //var useridNumber = parseInt(userid, 10);
      if (fromUser === userid) {
        var userData = req.body;
        // var userId = new ObjectID(userid);
        // db.collection('users').updateOne({
        //     _id: userId
        //   }, {
        //     $set: {
        //       "username": userData.username,
        //       "gender": userData.gender,
        //       "password": userData.password,
        //       "userData.blockedUsers": userData.blocked.map((user) => {
        //         return user._id
        //       }),
        //       "userData.email": userData.email,
        //       "userData.emailset": userData.emailset,
        //       "userData.image": userData.image
        //     }
        //   }, function(err, result) {
        //     if (err) {
        //       return sendDatabaseError(res, err);
        //     } else if (result.modifiedCount === 0) {
        //       // Could not find the specified feed item. Perhaps it does not exist, or
        //       // is not authored by the user.
        //       // 400: Bad request.
        //       return res.status(400).end();
        //     }
        //   });
        var ret = updateUserData(userid, userData.username, userData.gender, userData.password, userData.blockedUsers, userData.email, userData.emailset, userData.image);

        res.send(ret);
      } else {
        res.status(401).end();
      }
    });

    function unBlock(user, blockedUser) {
      var userData = readDocument('users', user);
      //console.log("3.1");
      var index = userData.blockedUsers.indexOf(blockedUser);
      //console.log("3.2");
      userData.blockedUsers.splice(index, 1);
      //console.log("3.3");
      writeDocument('users', userData);
      //console.log("3.4");
      return userData;
    }

    app.delete('/user/:id/blockedusers/:userid', function(req, res) {
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      var userid = req.params.userid;
      // Convert from a string into a number.
      //console.log("1");
      //  var useridNumber = parseInt(userid, 10);
      //console.log("2: " + userid );
      var userId = readDocument('users', userid);
      //console.log(userId);
      var blockedUserId = getBlockedUserSync(userId);
      //console.log("4: "+ blockedUserId);
      // Check that the author of the post is requesting the delete.
      if (userid === fromUser) {
        //console.log("5");
        var unBlocked = unBlock(userId, blockedUserId);
        //console.log("6");
        //send update user back
        res.send(unBlocked);
      } else {
        //console.log("7");
        // 401: Unauthorized.
        res.status(401).end();
      }
    });

  };
