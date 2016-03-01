import React from 'react';
import ReactDOM from 'react-dom';

var initialData = {
  'users': {
    '1': {
      '_id': 1,
      'username': 'tim.richards',
      'feed': 1
    }
  },

  'feeds': {
    '1': {
      '_id': 1,
      'contents': [ 1 ]
    }
  },

  'boards': {},

  'threads': {
    '1': {
      '_id': 1,
      'boards': [ 1 ],

      'originalPost': {
        'author': 1,
        'title': 'UMass Hackathon',
        'postDate': 1456866266,
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
