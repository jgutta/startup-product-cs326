import { readDocument, writeDocument,/*addDoc was not used, commenting for now addDocument,*/ readCollection } from './database.js';

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

//!!
export function getThreadData(threadId, cb) {
  var thread = readDocument('threads', threadId);
  var threadData = {
    contents: []
  };
  threadData.contents = thread.replies.map((everything) => getThreadSync(thread, everything));

  emulateServerReturn(threadData, cb);
}

//!!postThreadReply(). worry later

export function getFeedData(user, cb) {
  var userData = readDocument('users', user);
  var feedData = readDocument('feeds', userData.feed);

  feedData.contents = feedData.contents.map(getThreadSync);

  emulateServerReturn(feedData, cb);
}
export function getBoardInfo(boardId, cb){
  var board = readDocument('boards', boardId);

  emulateServerReturn(board, cb)
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

export function getSubscribedBoardsData(user, cb) {
  var userData = readDocument('users', user);
  var subscribedBoardsData = {
    contents: []
  };
  subscribedBoardsData.contents = userData.subscribedBoards.map(getBoardSync);

  emulateServerReturn(subscribedBoardsData, cb);
}

export function getBoardsData(cb){
  var boards = readCollection('boards');
  var boardsData = {
    boardsList: []
  };

  for(var i in boards)
    boardsData.boardsList.push(boards[i]);


  emulateServerReturn(boardsData, cb);
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

export function getConversationData(user, conversationId, cb) {
  var conversationData = {};
  conversationData.conversation = getConversationSync(user, conversationId);

  emulateServerReturn(conversationData, cb);
}


export function postMessage(conversationId, author, title, contents, cb) {
  var conversation = readDocument('conversations', conversationId);
  conversation.messages.push({
    'author': author,
    'title': title,
    'postDate': new Date().getTime(),
    'contents': contents
  });

  writeDocument('conversations', conversation);

  emulateServerReturn(getConversationSync(author, conversationId), cb);
}


export function getSearchData(cb) {
  var threads = readCollection('threads');
  var threadData = {
    contents: []
  };

  for(var i in threads)
    threadData.contents.push(threads[i]);

  emulateServerReturn(threadData, cb);
}

export function createThread(author, title, date, time, desc, image, boards, cb) {
    var threads = {
      'author': author,
      'title': title,
      'date': date,
      'time': time,
      'description': desc,
      'image': image,
      'boards': boards
    };

    writeDocument('threads', threads);
    emulateServerReturn(threads, cb);
  }
