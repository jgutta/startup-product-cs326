import React from 'react';

export default class PinnedPosts extends React.Component {
  render() {
    return (
      <div className="panel panel-default content-panel">
        <div className="panel-heading">
          <h3 className="panel-title">Pinned Posts React!</h3>
        </div>
        <div className="panel-body">
          <ul className="list-group">
            <li className="list-group-item"><a href="#">Concert at Herter</a></li>
            <li className="list-group-item"><a href="#">Smash at Sylvan</a></li>
            <li className="list-group-item"><a href="#">Anyone want to jam? (Drummer)</a></li>
            <li className="list-group-item"><a href="#">RSO Movie Night</a></li>
          </ul>
          <nav>
            <ul className="pager">
              <li><a href="#">More...</a></li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
