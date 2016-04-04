import React from 'react';
import { Link } from 'react-router';

import { getPinnedPostsData, deletePinnedPost } from '../server';

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
      contents: [],
      maxPinnedPosts: 8
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

  handleUnSub(e, id) {
    e.preventDefault();
    deletePinnedPost(this.state._id, id, () => {
      this.refresh();
    });
  }

  pagerHandler(e) {
    e.preventDefault();

    var maxPinnedPosts = this.state.maxPinnedPosts + 5;
    this.setState({
      maxPinnedPosts: maxPinnedPosts
    });
  }

  refresh() {
    getPinnedPostsData(this.props.user, (pinnedPostsData) => {
      this.setState(pinnedPostsData);
    });
  }

  render() {
    var maxPinnedPosts = this.state.maxPinnedPosts;

    return (
      <div className="panel panel-default content-panel">
        <div className="panel-heading">
          <h3 className="panel-title">Pinned Posts</h3>
        </div>
        <div className="panel-body">
          <ul className="list-group">
            {this.state.contents.slice(0, maxPinnedPosts).map((thread) => {
               return (
                 <li className="list-group-item" key={thread._id}>
                   <Link to={"/threads/" + thread._id}>{thread.originalPost.title}</Link>
                   <i className="fa fa-minus-circle pull-right" onClick={(e) => this.handleUnSub(e, thread._id)} />
                 </li>
               );
             })}
          </ul>

          {this.state.contents.length > maxPinnedPosts ?
           <nav>
             <ul className="pager">
               <li><a href="#" onClick={(e) => this.pagerHandler(e)}>More...</a></li>
             </ul>
           </nav> :
           <div />
          }
        </div>
      </div>
    )
  }
}
