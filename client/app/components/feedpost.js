import React from 'react';
import { Link } from 'react-router';
import { unixTimeFromNow } from '../util';

export default class FeedPost extends React.Component {
  render() {
    var data = this.props.data;

    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-sm-6">
            <Link to={"/threads/" + data._id}>{data.originalPost.title}</Link>
          </div>
          <div className="col-sm-6 date-posted">
            Posted {unixTimeFromNow(data.originalPost.postDate)}
          </div>
        </div>
        <hr />
        <p>{data.originalPost.description}</p>
        <div className="post-comment-count">
          {data.commentsNo} comments, {data.viewsNo} views
        </div>
      </li>
    )
  }
}
