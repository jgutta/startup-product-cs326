// Your startup's initial mock objects go here
var initialData = {
  'users': {
    '1': {
      '_id': 1,
      'feed': 1,
      'pinnedPosts': 1,
      'subscribedBoards': [ 2, 4, 7, 11 ],
      'conversations': [ 1, 2, 3, 4, 5 ],
      'username': 'tim.richards',
      'gender': 1,
      'password':'badpassword1',
      'blockedUsers': [ 8 ],
      'email': 'richards@cs.umass.edu',
      'emailset': 1,
      'image': 'img/default_profile_pic.png'
    },
    '2': {
      '_id': 2,
      'feed': 2
    },
    '3': {
      '_id': 3,
      'username': 'cinemaloverno7',
      'image': 'img/326-patrick.JPG'
    },
    '4': {
      '_id': 4,
      'username': 'guitarist78',
      'image': 'img/326-spongebob.JPG'
    },
    '5': {
      '_id': 5,
      'username': 'ilikemonopoly',
      'image': 'img/326-thatkid.JPG'
    },
    '6': {
      '_id': 6,
      'username': 'pizzzzaparty666',
      'image': 'img/326-cheeta.JPG'
    },
    '7': {
      '_id': 7,
      'username': 'concertrocker\\m/',
      'image': 'img/326-tmnt.JPG'
    },
    '8':{
        '_id': 8,
        'username': 'spambot',
        'image': 'img/default_profile_pic.png'
    }
  },

  'feeds': {
    '1': {
      '_id': 1,
      'contents': [ 1, 2, 3, 4 ]
    },
    '2': {
      'id': 2,
      'contents': [ 1, 4 ]
    }
  },

  'pinnedPosts': {
    '1': {
      '_id': 1,
      'contents': [ 2, 3 ]
    }
  },

  'boards': {
    '1': {
      '_id': 1,
      'name': 'General',
      'threads': [ 1, 2, 3],
      'numUsers': 0,
      'numPosts': 0,
      'description': 'This is a general board where posts can be about any topic, or can be questions about the site. All posts are archived here.',
      'image': 'img/general.jpg'
    },
    '2': {
      '_id': 2,
      'name': 'Concerts',
      'threads': [ 2 ],
      'numUsers': 0,
      'numPosts': 0,
      'description': 'Find friends to attend a concert with. You can also find info on upcoming concerts or supply info for your upcoming concerts!',
      'image': 'img/concert.jpg'
    },
    '3': {
      '_id': 3,
      'name': 'Games',
      'threads': [],
      'numUsers': 0,
      'numPosts': 0,
      'description': 'Find groups of people looking to meet up and play a variety of tabel-top games, card games, and all sorts of boardgames.',
      'image': 'img/games.jpg'
    },
    '4': {
      '_id': 4,
      'name': 'Local Events',
      'threads': [ 1 ],
      'numUsers': 0,
      'numPosts': 0,
      'description': 'Find out about what is happening in your community, commit to attending local events, or look for people to attend your events.',
      'image': 'img/localevent.jpg'
    },
    '5': {
      '_id': 5,
      'name': 'Music',
      'threads': [ 4 ],
      'numUsers': 0,
      'numPosts': 0,
      'description': 'Share music with people, give and get suggestions based on your tastes, find jam buddies, and discuss anything else music.',
      'image': 'img/music.jpg'
    },
    '6': {
      '_id': 6,
      'name': 'Note/Textbook Exchange',
      'threads': [],
      'numUsers': 0,
      'numPosts': 0,
      'description': 'Find notes for all your classes and post your own to share. You can also find people to share or exchange textbooks.',
      'image': 'img/textbook.jpg'
    },
    '7': {
      '_id': 7,
      'name': 'RSOs',
      'threads': [],
      'numUsers': 0,
      'numPosts': 0,
      'description': 'Connect with your RSO and get all the information about upcoming events, or find other people to get an RSO running.',
      'image': 'img/rso.jpg'
    },
    '8': {
      '_id': 8,
      'name': 'Sports',
      'threads': [],
      'numUsers': 0,
      'numPosts': 0,
      'description': 'Find people to get a pickup game going, coordinate with teammates, find a local club team, or discuss local games.',
      'image': 'img/sport.jpg'
    },
    '9': {
      '_id': 9,
      'name': 'Studying',
      'threads': [],
      'numUsers': 0,
      'numPosts': 0,
      'description': 'Find a study buddy for finals week, find practice questions of your test, or get suggestions about improving your study habits.',
      'image': 'img/studying.jpg'
    },
    '10': {
      '_id': 10,
      'name': 'TV/Movies',
      'threads': [],
      'numUsers': 0,
      'numPosts': 0,
      'description': 'Planning a movie night? Find some new friends to attend your showing or find a movie you have been wanting to watch.',
      'image': 'img/tv.jpg'
    },
    '11': {
      '_id': 11,
      'name': 'Videogames',
      'threads': [ 3 ],
      'numUsers': 0,
      'numPosts': 0,
      'description': 'Find friends to host a lan party or an online party. Discuss old games, new games, and awaited releases. Everything games!',
      'image': 'img/videogames.jpg'
    }
  },

  'threads': {
    '1': {
      '_id': 1,
      'boards': [ 1, 4 ],
      'commentsNo': 8,
      'viewsNo': 10,


      'originalPost': {
        'author': 1,
        'title': 'UMass Hackathon',
        'date': '3/11/16',
        'time': '7:00PM',
        'img': 'img/default.png',
        'postDate': 1457072173808,
        'description': 'Hackathon friday at the Campus Center. Come hack!'
      },

      'replies': [ 1, 3, 6 ]
    },
    '2': {
      '_id': 2,
      'boards': [ 1, 2 ],
      'commentsNo': 0,
      'viewsNo': 37,

      'originalPost': {
        'author': 1,
        'title': 'Concert at Herter',
        'date': '3/9/16',
        'time': '6:30PM',
        'img': 'img/default.png',
        'postDate': 1457105227129,
        'description': "There's going to be a math-rock concert Wednesday night at Herter, if anyone's interested. Giraffes? Giraffes! is going to be playing!"
      },

      'replies': []
    },
    '3': {
      '_id': 3,
      'boards': [ 1, 11 ],
      'commentsNo': 0,
      'viewsNo': 30,

      'originalPost': {
        'author': 1,
        'title': 'Smash at Sylvan',
        'date': '',
        'time': '',
        'img': 'img/default.png',
        'postDate': 1457123570979,
        'description': 'Anyone in Sylvan want to play super smash brothers? I have a setup for melee at my dorm.'
      },

      'replies': []
    },
    '4': {
      '_id': 4,
      'boards': [ 5 ],
      'commentsNo': 0,
      'viewsNo': 30,

      'originalPost': {
        'author': 1,
        'title': 'Anyone want to jam? (Drummer)',
        'date': '',
        'time': '',
        'img': 'img/default.png',
        'postDate': 1457133892466,
        'description': 'Drummer looking for someone to jam with. I like classic rock and jazz fusion.'
      },

      'replies': []
    }
  },

  'replies': {
    '1': {
      '_id': 1,
      'author': 6,
      'postDate': 1456869201382,
      'contents': "I can't wait! Does anyone have any ideas of what they're going to do?",
      'replies': [ 2, 5 ]
    },
    '2': {
      '_id': 2,
      'author': 4,
      'postDate': 1456871392938,
      'contents': "Yeah, I was thinking of doing something involving a FitBit. PM me if you're interested.",
      'replies': [ 4 ]
    },
    '3': {
      '_id': 3,
      'author': 3,
      'postDate': 1456878392398,
      'contents': 'lol nerds',
      'replies': []
    },
    '4': {
      '_id': 4,
      'author': 6,
      'postDate': 1458016175839,
      'contents': 'Sounds awesome!',
      'replies': []
    },
    '5': {
      '_id': 5,
      'author': 5,
      'postDate': 1458016441928,
      'contents': 'I really want to do something with an oculus rift.',
      'replies': []
    },
    '6': {
      '_id': 6,
      'author': 7,
      'postDate': 1458055210397,
      'contents': "Can someone post the hackathon website? What's the deadline for signing up? What are these things like, I've never been to one before.",
      'replies': [ 7, 8 ]
    },
    '7': {
      '_id': 7,
      'author': 1,
      'postDate': 1458056664561,
      'contents': 'The website is hackumass.com',
      'replies': []
    },
    '8': {
      '_id': 6,
      'author': 5,
      'postDate': 1458072751982,
      'contents': "They're awesome, man. I went to my first one last year at UMass. Do you need a team?",
      'replies': []
    }
  },

  'conversations': {
    '1': {
      '_id': 1,
      'users': [ 1, 3 ],

      'messages': [
        {
          'author': 1,
          'title': 'Re: The Projectionist',
          'postDate': 1457135847180,
          'contents': "Yeah, I'll definitely be able to bring the movie."
        },
        {
          'author': 3,
          'title': 'Re: The Projectionist',
          'postDate': 1457136164289,
          'contents': "Awesome! I think I'll be bringing a group of ~5 with me."
        },
        {
          'author': 3,
          'title': 'Re: The Projectionist',
          'postDate': 1457136262123,
          'contents': 'Oh, btw, any word on Rene?'
        }
      ]
    },
    '2': {
      '_id': 2,
      'users': [ 1, 4 ],

      'messages': [
        {
          'author': 1,
          'title': 'Re: Band',
          'postDate': 1456885425431,
          'contents': "Can I get an audition? I'm a really good guitarist."
        }
      ]
    },
    '3': {
      '_id': 3,
      'users': [ 1, 5 ],

      'messages': []
    },
    '4': {
      '_id': 4,
      'users': [ 1, 6 ],

      'messages': []
    },
    '5': {
      '_id': 5,
      'users': [ 1, 7 ],

      'messages': []
    }
  }
};

var data;
// If 'true', the in-memory object representing the database has changed,
// and we should flush it to disk.
var updated = false;
// Pull in Node's file system and path modules.
var fs = require('fs'),
  path = require('path');

try {
  // ./database.json may be missing. The comment below prevents ESLint from
  // complaining about it.
  // Read more about configuration comments at the following URL:
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  /* eslint "node/no-missing-require": "off" */
  data = require('./database.json');
} catch (e) {
  // ./database.json is missing. Use the seed data defined above
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  var collectionObj = data[collection];
  if (!collectionObj) {
    throw new Error(`Object collection ${collection} does not exist in the database!`);
  }
  var obj = collectionObj[id];
  if (obj === undefined) {
    throw new Error(`Object ${id} does not exist in object collection ${collection} in the database!`);
  }
  return JSONClone(data[collection][id]);
}
module.exports.readDocument = readDocument;

/**
 * Emulates writing a "document" to a NoSQL database.
 */
function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  if (id === undefined) {
    throw new Error(`You cannot write a document to the database without an _id! Use AddDocument if this is a new object.`);
  }
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  updated = true;
}
module.exports.writeDocument = writeDocument;

/**
 * Adds a new document to the NoSQL database.
 */
function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  if (newDoc.hasOwnProperty('_id')) {
    throw new Error(`You cannot add a document that already has an _id. addDocument is for new documents that do not have an ID yet.`);
  }
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}
module.exports.addDocument = addDocument;

/**
 * Deletes a document from an object collection.
 */
function deleteDocument(collectionName, id) {
  var collection = data[collectionName];
  if (!collection[id]) {
    throw new Error(`Collection ${collectionName} lacks an item with id ${id}!`);
  }
  delete collection[id];
  updated = true;
}
module.exports.deleteDocument = deleteDocument;

/**
 * Returns an entire object collection.
 */
function getCollection(collectionName) {
  return JSONClone(data[collectionName]);
}
module.exports.getCollection = getCollection;

/**
 * Reset the database.
 */
function resetDatabase() {
  data = JSONClone(initialData);
  updated = true;
}
module.exports.resetDatabase = resetDatabase;

// Periodically updates the database on the hard drive
// when changed.
setInterval(function() {
  if (updated) {
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(data), { encoding: 'utf8' });
    updated = false;
  }
}, 200);
