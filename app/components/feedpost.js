import React from 'react';

export default class FeedPost extends React.Component {
  render() {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-sm-6">
            <a href="#">{this.props.title}</a>
          </div>
          <div className="col-sm-6 date-posted">
            Posted {this.props.postTime} ago
          </div>
        </div>
        <hr />
        <p>{this.props.children}</p>
        <div className="post-comment-count">
          {this.props.commentsNo} comments, {this.props.viewsNo} views
        </div>
      </li>
    )
  }
}
