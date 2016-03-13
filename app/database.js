import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = "DevSkillet";

// Put your mock objects here, as in Workshop 4
// 1 = male 2 = female 3 = other
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
      'image': 'img/326-patrick.jpg'
    },
    '4': {
      '_id': 4,
      'username': 'guitarist78',
      'image': 'img/326-spongebob.jpg'
    },
    '5': {
      '_id': 5,
      'username': 'ilikemonopoly',
      'image': 'img/default_profile_pic.png'
    },
    '6': {
      '_id': 6,
      'username': 'pizzzzaparty666',
      'image': 'img/326-cheeta.jpg'
    },
    '7': {
      '_id': 7,
      'username': 'concertrocker\\m/',
      'image': 'img/default_profile_pic.png'
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
      'commentsNo': 3,
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

      'replies': [
        {
          'author': 6,
          'postDate': 1456869201,
          'contents': "I can't wait! Does anyone have any ideas of what they're going to do?",

          'replies': [
            {
              'author': 4,
              'postDate': 1456871392,
              'contents': "Yeah, I was thinking of doing something involving a FitBit. PM me if you're interested.",

              'replies': []
            }
          ]
        },
        {
          'author': 3,
          'postDate': 1456878392,
          'contents': 'lol nerds',

          'replies': []
        }
      ]
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

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
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
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

export function readCollection(collection) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
 * Reset database button.
 */
class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        resetDatabase();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}

ReactDOM.render(
  <ResetDatabase />,
  document.getElementById('db-reset')
);
