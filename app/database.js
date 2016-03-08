import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = "DevSkillet";

// Put your mock objects here, as in Workshop 4
var initialData = {
  'users': {
    '1': {
      '_id': 1,
      'username': 'tim.richards',

      'feed': 1,
      'pinnedPosts': 1,
      'subscribedBoards': [ 2, 4, 7, 11 ],

      'conversations': [ 1, 2, 3, 4, 5 ]
    },
    '2': {
      '_id': 2,
      'feed': 2
    },
    '3': {
      '_id': 3,
      'username': 'cinemaloverno7'
    },
    '4': {
      '_id': 4,
      'username': 'guitarist78'
    },
    '5': {
      '_id': 5,
      'username': 'ilikemonopoly'
    },
    '6': {
      '_id': 6,
      'username': 'pizzzzaparty666'
    },
    '7': {
      '_id': 7,
      'username': 'concertrocker\\m/'
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
      'threads': [1,2,3]
    },
    '2': {
      '_id': 2,
      'name': 'Concerts',
      'threads': []
    },
    '3': {
      '_id': 3,
      'name': 'Games',
      'threads': [4]
    },
    '4': {
      '_id': 4,
      'name': 'Local Events',
      'threads': []
    },
    '5': {
      '_id': 5,
      'name': 'Music',
      'threads': []
    },
    '6': {
      '_id': 6,
      'name': 'Note/Textbook Exchange',
      'threads': []
    },
    '7': {
      '_id': 7,
      'name': 'RSOs',
      'threads': []
    },
    '8': {
      '_id': 8,
      'name': 'Sports',
      'threads': []
    },
    '9': {
      '_id': 9,
      'name': 'Studying',
      'threads': []
    },
    '10': {
      '_id': 10,
      'name': 'TV/Movies',
      'threads': []
    },
    '11': {
      '_id': 11,
      'name': 'Videogames',
      'threads': []
    }
  },

  'threads': {
    '1': {
      '_id': 1,
      'boards': [ 1 ],
      'commentsNo': 3,
      'viewsNo': 10,


      'originalPost': {
        'author': 1,
        'title': 'UMass Hackathon',
        'img': 'img/ExampleBoard.jpg',
        'postDate': 1457072173808,
        'contents': 'Hackathon friday at the Campus Center. Come hack!'
      },

      'replies': [
        {
          'author': 2,
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
      'boards': [ 1 ],
      'commentsNo': 0,
      'viewsNo': 37,

      'originalPost': {
        'author': 1,
        'img': 'img/ExampleBoard.jpg',
        'title': 'Concert at Herter',
        'postDate': 1457105227129,
        'contents': "There's going to be a math-rock concert Wednesday night at Herter, if anyone's interested. Giraffes? Giraffes! is going to be playing!"
      },

      'replies': []
    },
    '3': {
      '_id': 3,
      'boards': [ 1 ],
      'commentsNo': 0,
      'viewsNo': 30,

      'originalPost': {
        'author': 1,
        'title': 'Smash at Sylvan',
        'img': 'img/ExampleBoard.jpg',
        'postDate': 1457123570979,
        'contents': 'Anyone in Sylvan want to play super smash brothers? I have a setup for melee at my dorm.'
      },

      'replies': []
    },
    '4': {
      '_id': 4,
      'boards': [ 3 ],
      'commentsNo': 0,
      'viewsNo': 30,

      'originalPost': {
        'author': 1,
        'title': 'Anyone want to jam? (Drummer)',
        'img': 'img/ExampleBoard.jpg',
        'postDate': 1457133892466,
        'contents': 'Drummer looking for someone to jam with. I like classic rock and jazz fusion.'
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
