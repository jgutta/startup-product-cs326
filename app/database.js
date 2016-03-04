import React from 'react';
import ReactDOM from 'react-dom';

var initialData = {
  'users': {
    '1': {
      '_id': 1,
      'username': 'tim.richards',
      'feed': 1
    },
    '2': {
      '_id': 2,
      'username': 'tim.richards',
      'feed': 2
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

  'boards': {},

  'threads': {
    '1': {
      '_id': 1,
      'boards': [ 1 ],
      'commentsNo': 3,
      'viewsNo': 10,

      'originalPost': {
        'author': 1,
        'title': 'UMass Hackathon',
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
        'title': 'Concert at Herter',
        'postDate': 1457105227129,
        'contents': 'contents'
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
        'postDate': 1457105227129,
        'contents': 'contents'
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
        'postDate': 1457105227129,
        'contents': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis ante nec dapibus lacinia. Maecenas luctus pretium justo. Curabitur tristique risus sed odio condimentum, a maximus turpis ultrices. Vestibulum sed pellentesque lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum eu auctor arcu. Nam vel nisl lobortis, dignissim est et, suscipit neque. Donec volutpat arcu erat, ac scelerisque nisi ultricies eu.'
      },

      'replies': []
    }
  },

  'conversations': {}
};

var data = JSON.parse(localStorage.getItem('facebook_data'));
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

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem('facebook_data', JSON.stringify(data));
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
  localStorage.setItem('facebook_data', JSON.stringify(initialData));
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
  document.getElementById('fb-db-reset')
);
