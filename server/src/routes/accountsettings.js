var UserSchema = require('../schemas/accountsettings.json');

var validate = require('express-jsonschema').validate;

exports.setApp = function(app,
  getUserIdFromToken,
  readDocument, writeDocument)

  {

    function getUserData(userId){
      var user = readDocument('users', userId);
      //console.log(user);
      user.blockedUsers = user.blockedUsers.map(getBlockedUserSync);
      var userData = {
        user : user
      };

      return userData;
    }
    app.get('/user/:userid', function(req, res) {
      var userid = req.params.userid;

      var fromUser = getUserIdFromToken(req.get('Authorization'));
      var useridNumber = parseInt(userid, 10);
      if (fromUser === useridNumber) {
        res.send(getUserData(userid));
      } else {
        res.status(401).end();
      }
    });


    function getBlockedUserSync(user) {
      console.log(user);
      var blocked = readDocument('users',user);
      return blocked;
    }

    function updateUserData(userId, username, gender, password, blocked, email, emailset, image){
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

    app.put('/user/:userid/', validate({body: UserSchema}), function(req, res) {
      var userid = req.params.userid;
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      var useridNumber = parseInt(userid, 10);
      if (fromUser === useridNumber) {
        var userData = req.body;
    var ret =  updateUserData(useridNumber, userData.username, userData.gender, userData.password, userData.blockedUsers, userData.email, userData.emailset, userData.image);

        res.send(ret);
      } else {
        res.status(401).end();
      }
    });

    function unBlock(user , blockedUser){
      var userData = readDocument('users', user);
      console.log("3.1");
      var index = userData.blockedUsers.indexOf(blockedUser);
      console.log("3.2");
      userData.blockedUsers.splice(index, 1);
      console.log("3.3");
      writeDocument('users', userData);
      console.log("3.4");
      return userData;
    }

    app.delete('/user/:id/blockedusers/:userid', function(req, res) {
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      var userid = req.params.userid;
      // Convert from a string into a number.
      console.log("1");
      var useridNumber = parseInt(userid, 10);
      console.log("2: " + userid );
      var userId = readDocument('users', userid);
      console.log(userId);
      var blockedUserId = getBlockedUserSync(userId);
      console.log("4: "+ blockedUserId);
      // Check that the author of the post is requesting the delete.
      if (useridNumber === fromUser) {
        console.log("5");
        var unBlocked = unBlock(userId, blockedUserId);
        console.log("6");
        //send update user back
        res.send(unBlocked);
      } else {
        console.log("7");
        // 401: Unauthorized.
        res.status(401).end();
      }
    });

  };
