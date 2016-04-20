var token = 'eyJpZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMSJ9'

/**
 * Properly configure+send an XMLHttpRequest with error handling, authorization token,
 * and other needed properties.
 */
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  // The below comment tells ESLint that FacebookError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)
  /* global UBoardError */

  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      // The server may have included some response text with details concerning
      // the error.
      var responseText = xhr.responseText;
      UBoardError('Could not ' + verb + " " + resource + ": Received " + statusCode + " " + statusText + ": " + responseText);
    }
  });

  // Time out the request if it takes longer than 10,000 milliseconds (10 seconds)
  xhr.timeout = 10000;

  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    UBoardError('Could not ' + verb + " " + resource + ": Could not connect to the server.");
  });

  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    UBoardError('Could not ' + verb + " " + resource + ": Request timed out.");
  });

  switch (typeof(body)) {
    case 'undefined':
      // No body to send.
      xhr.send();
      break;
    case 'string':
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case 'object':
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Convert body into a JSON string.
      xhr.send(JSON.stringify(body));
      break;
    default:
      throw new Error('Unknown body type: ' + typeof(body));
  }
}

// ====================
// Thread functions
// ====================
export function createThread(author, title, date, time, desc, image, boards, cb) {
  sendXHR('POST', '/thread', {
    boards: boards,

    originalPost: {
      author: author,
      title: title,
      date: date,
      time: time,
      img: image,
      description: desc
    }
  }, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}


export function postReply(threadId, author, contents, cb){
  sendXHR('POST', '/thread/' + threadId + '/replyto/', {
    author: author,
    postDate: new Date().getTime(),
    contents: contents,
    replies: []
  }, (xhr) =>{
    cb(JSON.parse(xhr.responseText));
  });
}

export function postReplyToReply(threadId, replyId, author, contents, cb){
  sendXHR('POST', '/thread/' + threadId + '/replyto/' + replyId + '/sub/', {
    author: author,
    postDate: new Date().getTime(),
    contents: contents,
    replies: []
  }, (xhr) =>{
    cb(JSON.parse(xhr.responseText));
  });
}


// ====================
// Board Data Functions
export function getBoardsData(cb){
  sendXHR('GET', '/boards/', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getBoardContent(boardId, cb){
  sendXHR('GET', '/board/' + boardId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  })
}
//=====================

// ====================
// User functions
// ====================


export function getFullThreadData(threadId, cb) {
  sendXHR('GET', '/thread/' + threadId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
  /*
     var thread = getFullThreadSync(threadId);
     var threadData = {
     contents: thread
     };
     emulateServerReturn(threadData, cb);
   */
}

export function getFeedData(userId, cb) {
  sendXHR('GET', '/feed/' + userId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getSubscribedBoardsData(user, cb) {
  sendXHR('GET', '/user/' + user + '/subscribedboards', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function addSubscribeBoard(user, board, cb) {
  sendXHR('PUT', '/user/' + user + '/subscribedboards/' + board, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function deleteSubscribeBoard(user, board, cb) {
  sendXHR('DELETE', '/user/' + user + '/subscribedboards/' + board, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}


// ====================
// Conversation functions
// ====================

export function getConversationsData(user, cb) {
  sendXHR('GET', '/user/' + user + '/conversation', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getConversationData(user, conversationId, cb) {
  sendXHR('GET', '/user/' + user + '/conversation/' + conversationId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function postMessage(conversationId, author, title, contents, cb) {
  sendXHR('POST', '/user/' + author + '/conversation/' + conversationId, {
    author: author,
    title: title,
    contents: contents
  }, (xhr) => {
    // Return the new status update.
    cb(JSON.parse(xhr.responseText));
  });
}

// ====================
// Search functions
// ====================

export function getSearchData(queryText, cb) {
  // userID is not needed; it's included in the JSON web token.
  sendXHR('POST', '/search', queryText, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getUserData(userId, cb){
  sendXHR('GET', '/user/' + userId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function updateUserData(userId,username, gender, password, blocked, email, emailset, image, cb) {

  sendXHR('PUT', '/user/' + userId, {
    username:username,
    gender:gender,
    password:password,
    blockedUsers:blocked,
    email:email,
    emailset:emailset,
    image:image
  }, (xhr) => {
    // Return the updated user.
    cb(JSON.parse(xhr.responseText));
  });
}



export function unBlock(user , blockedUserId, cb){
  sendXHR('DELETE', '/user/' + user + '/blockedUsers/' + blockedUserId, undefined, () => {
    cb();
  });
}


// ====================
// Pinned Post functions
// ====================

//For thread -returns just the content


export function addPinnedPost(user, threadID, cb) {
  sendXHR('PUT', '/user/' + user + '/pinnedposts/' + threadID, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function deletePinnedPost(user, threadID, cb) {
  sendXHR('DELETE', '/user/' + user + '/pinnedposts/' + threadID, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getPinnedPostsData(user, cb) {
  sendXHR('GET', '/user/' + user + '/pinnedposts', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getPinned(user, cb) {
  sendXHR('GET', '/user/' + user + '/pinnedposts2', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}
