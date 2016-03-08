import { readDocument, writeDocument, addDocument } from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}


function getThreadSync(threadId) {
  var thread = readDocument('threads', threadId);
  return thread;
}

export function getFeedData(user, cb) {
  var userData = readDocument('users', user);
  var feedData = readDocument('feeds', userData.feed);

  feedData.contents = feedData.contents.map(getThreadSync);

  emulateServerReturn(feedData, cb);
}

export function getPinnedPostsData(user, cb) {
  var userData = readDocument('users', user);
  var pinnedPostsData = readDocument('pinnedPosts', userData.pinnedPosts);

  pinnedPostsData.contents = pinnedPostsData.contents.map(getThreadSync);

  emulateServerReturn(pinnedPostsData, cb);
}


function getBoardSync(boardId) {
  var board = readDocument('boards', boardId);
  return board;
}

export function getAllBoards(cb){
  var boardList =[];
  for (var i=1; i<=11; i++){
    boardList.push(readDocument('boards', i));
  }
  emulateServerReturn(boardList, cb);
}

export function getSubscribedBoardsData(user, cb) {
  var userData = readDocument('users', user);
  var subscribedBoardsData = {
    contents: []
  };
  subscribedBoardsData.contents = userData.subscribedBoards.map(getBoardSync);

  emulateServerReturn(subscribedBoardsData, cb);
}


function getMessageSync(message) {
  message.authorUsername = readDocument('users', message.author).username;
  return message;
}

function getConversationSync(user, conversationId) {
  var conversation = readDocument('conversations', conversationId);

  conversation.messages = conversation.messages.map(getMessageSync);

  for(var i = conversation.users.length - 1; i >= 0; i--) {
    if(conversation.users[i] === user) {
      conversation.users.splice(i, 1);
    }
  }
  conversation.user = readDocument('users', conversation.users[0]).username;

  return conversation;
}

export function getConversationsData(user, cb) {
  var userData = readDocument('users', user);
  var conversationsData = {
    contents: []
  };
  conversationsData.contents = userData.conversations.map((conversation) => getConversationSync(user, conversation));

  emulateServerReturn(conversationsData, cb);
}
