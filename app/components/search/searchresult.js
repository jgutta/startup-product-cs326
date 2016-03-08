import React from 'react';
import { unixTimeFromNow } from '../../util';

export default class SearchResult extends React.Component {
  render() {
    var data = this.props.data;

    return (
      <div className="panel panel-default">
        <div className="panel-body result">
          <div className="row">
            <div className="col-sm-6">
              <a href="#">{data.originalPost.title}</a>
            </div>
            <div className="col-sm-6 date-posted">
              Posted {unixTimeFromNow(data.originalPost.postDate)}
            </div>
          </div>
        <hr />
        <p>{data.originalPost.contents}</p>
        <div className="post-comment-count">
          {data.commentsNo} comments, {data.viewsNo} views
        </div>
      </div>
      </div>
    )
  }
}
