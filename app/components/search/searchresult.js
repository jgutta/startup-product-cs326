import React from 'react';
import { unixTimeFromNow } from '../../util';
import { Link } from 'react-router';

export default class SearchResult extends React.Component {

  commas(array) {
    var str="";
    for(var i =0; i<array.length; i++) {
      if(i != array.length-1) {
        str = str+array[i].name+", ";
      }
      else{str = str+array[i].name;}
    }
    return (str);
  }

  render() {
    var data = this.props.data;
    return (
      <div className="panel panel-default">
        <div className="panel-body result">
          <div className="row">
            <div className="col-sm-6">
              <Link to={"/threads/" + data._id}>{data.originalPost.title}</Link> - {this.commas(data.boards)}
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
      </div>
      </div>
    )
  }
}
