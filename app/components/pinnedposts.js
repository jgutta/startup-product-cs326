import React from 'react';
import { Link } from 'react-router';

import { getPinnedPostsData } from '../server';

export default class PinnedPosts extends React.Component {
  constructor(props) {
    // super() calls the parent class constructor -- e.g. React.Component's constructor.
    super(props);
    // Set state's initial value.
    // Note that the constructor is the ONLY place you should EVER set state directly!
    // In all other places, use the `setState` method instead.
    // Setting `state` directly in other places will not trigger `render()` to run, so your
    // program will have bugs.
    this.state = {
      // Empty feed.
      contents: []
    };
  }

  componentDidMount() {
    getPinnedPostsData(this.props.user, (pinnedPostsData) => {
      // Note: setState does a *shallow merge* of the current state and the new
      // state. If state was currently set to {foo: 3}, and we setState({bar: 5}),
      // state would then be {foo: 3, bar: 5}. This won't be a problem here.
      this.setState(pinnedPostsData);
    });
  }

  render() {
    return (
      <div className="panel panel-default content-panel">
        <div className="panel-heading">
          <h3 className="panel-title">Pinned Posts</h3>
        </div>
        <div className="panel-body">
          <ul className="list-group">
            {this.state.contents.map((thread) => {
               return (
                 <li className="list-group-item" key={thread._id}>
                   <Link to={"/threads/" + thread._id}>{thread.originalPost.title}</Link>
                 </li>
               );
             })}
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
