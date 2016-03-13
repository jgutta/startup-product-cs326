import React from 'react';
import { Link } from 'react-router';
import { unixTimeFromNow } from '../../util';
import {retrieveNameFromId} from '../../server';
export default class FeedItem extends React.Component {
  render() {
    var data = this.props.data;

    return (

        <div className = "board row panel panel-default postContain">
        <div className="board row panel-heading">
        <h4 align="left"><Link className="links" to={"/threads/" + data._id}>{data.originalPost.title}</Link></h4><h5>{data.originalPost.date} {data.originalPost.time}</h5>
        </div>
        <div className = "board row panel-body post">
          <div className = "col-md-2">
            <Link to={"/threads/" + data._id}><img src = {data.originalPost.img} width = "100%"/></Link>
          </div>
           <div className = "col-md-10">
        {data.originalPost.description} </div>

        </div>
        <hr/>
        <div className ="col-md-3 reply">
                  <Link to={"/threads/" + data._id}> {data.commentsNo} Replies</Link>
                 </div>
                 <div className="col-md-3 reply">
                  <a href = "#"> Pin this Post</a>
                 </div>
        <div className="col-md-6 result-metadata">
                  {retrieveNameFromId(data.originalPost.author)} -  Posted {unixTimeFromNow(data.originalPost.postDate)}
                 </div>
        </div>

    )
  }
}
/*
<div className = "row panel panel-default postContain">
<div className="row panel-heading">
<h4 align="left">POST TITLE</h4><h5> 2/7/16 at 12:00AM</h5>
</div>
<div className = "row panel-body post">
  <div className = "col-md-2">
    <a href = "#"><img src = "img/ExampleBoard.jpg" width = "100%"></a>
  </div>
   <div className = "col-md-10">
This is where the first few characters of a post would show. Two line max? </div>

</div>
<hr/>
<div className ="col-md-3 reply">
           100 Replies
         </div>
         <div className="col-md-3 reply">
           Pin this Post
         </div>
<div className="col-md-6 result-metadata">
           Username - Sat Feb 6, 2:15 PM
         </div>
</div>

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
*/
