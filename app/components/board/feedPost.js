import React from 'react';
import { unixTimeFromNow } from '../../util';

export default class feedPost extends React.Component {
  render() {
    var thread = this.props.thread;

    return (
      <li className="list-group-item">
      <div className = "row panel panel-default postContain">
      <div className="row panel-heading">
      <h4 align="left">{thread.originalPost.title}</h4>
      </div>
      <div className = "row panel-body post">
         <div className = "col-md-2">
           <a href = "#"><img src = {thread.originalPost.img} width = "100%" /></a>
         </div>
          <div className = "col-md-10">
    { thread.originalPost.contents} </div>

      </div>
      <hr />
       <div className="col-md-3 reply">
                  {thread.commentsNo} Replies
                </div>
                <div className="col-md-3 reply">
                  Pin this Post
                </div>
       <div className="col-md-6 result-metadata">
                  {thread.originalPost.author} - {unixTimeFromNow(thread.originalPost.postDate)}
                </div>
      </div>
      </li>
    )
  }
}
/*<div class = "row panel panel-default postContain">
<div class="row panel-heading">
<h4 align="left">POST TITLE</h4><h5> </h5>
</div>
<div class = "row panel-body post">
   <div class = "col-md-2">
     <a href = "#"><img src = "img/ExampleBoard.jpg" width = "100%"></a>
   </div>
    <div class = "col-md-10">
This is where the first few characters of a post would show. Two line max? </div>

</div>
<hr>
 <div class="col-md-3 reply">
            100 Replies
          </div>
          <div class="col-md-3 reply">
            Pin this Post
          </div>
 <div class="col-md-6 result-metadata">
            Username - Sat Feb 6, 2:15 PM
          </div>
</div>*/
