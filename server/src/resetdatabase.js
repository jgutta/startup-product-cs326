var ObjectID = require('mongodb').ObjectID;

// Put your startup's name here (only letters and numbers -- no spaces, apostrophes, or special characters!)
var databaseName = "UBoard";
// Put the initial mock objects here.
var initialData = {
  'users': {
    '1': {
      '_id': new ObjectID("000000000000000000000001"),
      'feed': new ObjectID("000000000000000000000001"),
      'pinnedPosts': new ObjectID("000000000000000000000001"),
      'subscribedBoards': [ new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000004"), new ObjectID("000000000000000000000007"), new ObjectID("000000000000000000000011") ],
      'conversations': [ new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003"), new ObjectID("000000000000000000000004"), new ObjectID("000000000000000000000005") ],
      'username': 'tim.richards',
      'gender': 1,
      'password':'badpassword1',
      'blockedUsers': [ new ObjectID("000000000000000000000008") ],
      'email': 'richards@cs.umass.edu',
      'emailset': 1,
      'image': 'img/default_profile_pic.png'
    },
    '2': {
      '_id': new ObjectID("000000000000000000000002"),
      'feed': new ObjectID("000000000000000000000002")
    },
    '3': {
      '_id': new ObjectID("000000000000000000000003"),
      'username': 'cinemaloverno7',
      'image': 'img/326-patrick.JPG'
    },
    '4': {
      '_id': new ObjectID("000000000000000000000004"),
      'username': 'guitarist78',
      'image': 'img/326-spongebob.JPG'
    },
    '5': {
      '_id': new ObjectID("000000000000000000000005"),
      'username': 'ilikemonopoly',
      'image': 'img/326-thatkid.JPG'
    },
    '6': {
      '_id': new ObjectID("000000000000000000000006"),
      'username': 'pizzzzaparty666',
      'image': 'img/326-cheeta.JPG'
    },
    '7': {
      '_id': new ObjectID("000000000000000000000007"),
      'username': 'concertrocker\\m/',
      'image': 'img/326-tmnt.JPG'
    },
    '8':{
      '_id': new ObjectID("000000000000000000000008"),
      'username': 'spambot',
      'image': 'img/default_profile_pic.png'
    }
  },

  'feeds': {
    '1': {
      '_id': new ObjectID("000000000000000000000001"),
      'contents': [ new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003"), new ObjectID("000000000000000000000004") ]
    },
    '2': {
      '_id': new ObjectID("000000000000000000000002"),
      'contents': [ new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000004") ]
    }
  },

  'pinnedPosts': {
    '1': {
      '_id': new ObjectID("000000000000000000000001"),
      'contents': [ new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003") ]
    }
  },

  'boards': {
    '1': {
      '_id': new ObjectID("000000000000000000000001"),
      'name': 'General',
      'threads': [ new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003")],
      'numUsers': 0,
      'numPosts': 3,
      'description': 'This is a general board where posts can be about any topic, or can be questions about the site. All posts are archived here.',
      'image': 'img/general.jpg'
    },
    '2': {
      '_id': new ObjectID("000000000000000000000002"),
      'name': 'Concerts',
      'threads': [ new ObjectID("000000000000000000000002") ],
      'numUsers': 1,
      'numPosts': 1,
      'description': 'Find friends to attend a concert with. You can also find info on upcoming concerts or supply info for your upcoming concerts!',
      'image': 'img/concert.jpg'
    },
    '3': {
      '_id': new ObjectID("000000000000000000000003"),
      'name': 'Games',
      'threads': [],
      'numUsers': 0,
      'numPosts': 0,
      'description': 'Find groups of people looking to meet up and play a variety of tabel-top games, card games, and all sorts of boardgames.',
      'image': 'img/games.jpg'
    },
    '4': {
      '_id': new ObjectID("000000000000000000000004"),
      'name': 'Local Events',
      'threads': [ new ObjectID("000000000000000000000001") ],
      'numUsers': 1,
      'numPosts': 1,
      'description': 'Find out about what is happening in your community, commit to attending local events, or look for people to attend your events.',
      'image': 'img/localevent.jpg'
    },
    '5': {
      '_id': new ObjectID("000000000000000000000005"),
      'name': 'Music',
      'threads': [ new ObjectID("000000000000000000000004") ],
      'numUsers': 0,
      'numPosts': 1,
      'description': 'Share music with people, give and get suggestions based on your tastes, find jam buddies, and discuss anything else music.',
      'image': 'img/music.jpg'
    },
    '6': {
      '_id': new ObjectID("000000000000000000000006"),
      'name': 'Note/Textbook Exchange',
      'threads': [],
      'numUsers': 0,
      'numPosts': 0,
      'description': 'Find notes for all your classes and post your own to share. You can also find people to share or exchange textbooks.',
      'image': 'img/textbook.jpg'
    },
    '7': {
      '_id': new ObjectID("000000000000000000000007"),
      'name': 'RSOs',
      'threads': [],
      'numUsers': 1,
      'numPosts': 0,
      'description': 'Connect with your RSO and get all the information about upcoming events, or find other people to get an RSO running.',
      'image': 'img/rso.jpg'
    },
    '8': {
      '_id': new ObjectID("000000000000000000000008"),
      'name': 'Sports',
      'threads': [],
      'numUsers': 0,
      'numPosts': 0,
      'description': 'Find people to get a pickup game going, coordinate with teammates, find a local club team, or discuss local games.',
      'image': 'img/sport.jpg'
    },
    '9': {
      '_id': new ObjectID("000000000000000000000009"),
      'name': 'Studying',
      'threads': [],
      'numUsers': 0,
      'numPosts': 0,
      'description': 'Find a study buddy for finals week, find practice questions of your test, or get suggestions about improving your study habits.',
      'image': 'img/studying.jpg'
    },
    '10': {
      '_id': new ObjectID("000000000000000000000010"),
      'name': 'TV/Movies',
      'threads': [],
      'numUsers': 0,
      'numPosts': 0,
      'description': 'Planning a movie night? Find some new friends to attend your showing or find a movie you have been wanting to watch.',
      'image': 'img/tv.jpg'
    },
    '11': {
      '_id': new ObjectID("000000000000000000000011"),
      'name': 'Videogames',
      'threads': [ new ObjectID("000000000000000000000003") ],
      'numUsers': 1,
      'numPosts': 1,
      'description': 'Find friends to host a lan party or an online party. Discuss old games, new games, and awaited releases. Everything games!',
      'image': 'img/videogames.jpg'
    }
  },

  'threads': {
    '1': {
      '_id': new ObjectID("000000000000000000000001"),
      'boards': [ new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000004") ],
      'commentsNo': 8,
      'viewsNo': 10,


      'originalPost': {
        'author': new ObjectID("000000000000000000000001"),
        'title': 'UMass Hackathon',
        'date': '3/11/16',
        'time': '7:00PM',
        'img': 'img/default.png',
        'postDate': 1457072173808,
        'description': 'Hackathon friday at the Campus Center. Come hack!'
      },

      'replies': [ new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000003"), new ObjectID("000000000000000000000006") ]
    },
    '2': {
      '_id': new ObjectID("000000000000000000000002"),
      'boards': [ new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002") ],
      'commentsNo': 0,
      'viewsNo': 37,

      'originalPost': {
        'author': new ObjectID("000000000000000000000001"),
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
      '_id': new ObjectID("000000000000000000000003"),
      'boards': [ new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000011") ],
      'commentsNo': 0,
      'viewsNo': 30,

      'originalPost': {
        'author': new ObjectID("000000000000000000000001"),
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
      '_id': new ObjectID("000000000000000000000004"),
      'boards': [ new ObjectID("000000000000000000000005") ],
      'commentsNo': 0,
      'viewsNo': 30,

      'originalPost': {
        'author': new ObjectID("000000000000000000000001"),
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
      '_id': new ObjectID("000000000000000000000001"),
      'author': new ObjectID("000000000000000000000006"),
      'postDate': 1456869201382,
      'contents': "I can't wait! Does anyone have any ideas of what they're going to do?",
      'replies': [ new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000005") ]
    },
    '2': {
      '_id': new ObjectID("000000000000000000000002"),
      'author': new ObjectID("000000000000000000000004"),
      'postDate': 1456871392938,
      'contents': "Yeah, I was thinking of doing something involving a FitBit. PM me if you're interested.",
      'replies': [ new ObjectID("000000000000000000000004") ]
    },
    '3': {
      '_id': new ObjectID("000000000000000000000003"),
      'author': new ObjectID("000000000000000000000003"),
      'postDate': 1456878392398,
      'contents': 'lol nerds',
      'replies': []
    },
    '4': {
      '_id': new ObjectID("000000000000000000000004"),
      'author': new ObjectID("000000000000000000000006"),
      'postDate': 1458016175839,
      'contents': 'Sounds awesome!',
      'replies': []
    },
    '5': {
      '_id': new ObjectID("000000000000000000000005"),
      'author': new ObjectID("000000000000000000000005"),
      'postDate': 1458016441928,
      'contents': 'I really want to do something with an oculus rift.',
      'replies': []
    },
    '6': {
      '_id': new ObjectID("000000000000000000000006"),
      'author': new ObjectID("000000000000000000000007"),
      'postDate': 1458055210397,
      'contents': "Can someone post the hackathon website? What's the deadline for signing up? What are these things like, I've never been to one before.",
      'replies': [ new ObjectID("000000000000000000000007"), new ObjectID("000000000000000000000008") ]
    },
    '7': {
      '_id': new ObjectID("000000000000000000000007"),
      'author': new ObjectID("000000000000000000000001"),
      'postDate': 1458056664561,
      'contents': 'The website is hackumass.com',
      'replies': []
    },
    '8': {
      '_id': new ObjectID("000000000000000000000006"),
      'author': new ObjectID("000000000000000000000005"),
      'postDate': 1458072751982,
      'contents': "They're awesome, man. I went to my first one last year at UMass. Do you need a team?",
      'replies': []
    }
  },

  'conversations': {
    '1': {
      '_id': new ObjectID("000000000000000000000001"),
      'users': [ new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000003") ],

      'messages': [
        {
          'author': new ObjectID("000000000000000000000001"),
          'title': 'Re: The Projectionist',
          'postDate': 1457135847180,
          'contents': "Yeah, I'll definitely be able to bring the movie."
        },
        {
          'author': new ObjectID("000000000000000000000003"),
          'title': 'Re: The Projectionist',
          'postDate': 1457136164289,
          'contents': "Awesome! I think I'll be bringing a group of ~5 with me."
        },
        {
          'author': new ObjectID("000000000000000000000003"),
          'title': 'Re: The Projectionist',
          'postDate': 1457136262123,
          'contents': 'Oh, btw, any word on Rene?'
        }
      ]
    },
    '2': {
      '_id': new ObjectID("000000000000000000000002"),
      'users': [ new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000004") ],

      'messages': [
        {
          'author': new ObjectID("000000000000000000000001"),
          'title': 'Re: Band',
          'postDate': 1456885425431,
          'contents': "Can I get an audition? I'm a really good guitarist."
        }
      ]
    },
    '3': {
      '_id': new ObjectID("000000000000000000000003"),
      'users': [ new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000005") ],

      'messages': []
    },
    '4': {
      '_id': new ObjectID("000000000000000000000004"),
      'users': [ new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000006") ],

      'messages': []
    },
    '5': {
      '_id': new ObjectID("000000000000000000000005"),
      'users': [ new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000007") ],

      'messages': []
    }
  }
};

/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      addIndexes(db, cb);
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}


/**
 * Adds any desired indexes to the database.
 */
function addIndexes(db, cb) {
  db.collection('threads').createIndex({ "originalPost.description": "text" }, null, cb);
}
