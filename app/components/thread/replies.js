import React from 'react';
import { unixTimeToString } from '../../util';

export default class Replies extends React.Component {
  render() {
    var data = this.props.data;

    return(
      <ul className="media-list reply-list">
        {data.map((reply) => {
           return (
             <li className="media" key={reply._id}>
               <div className="media-left">
                 <img className="media-object img-rounded" src={reply.authorImage} />
               </div>
               <div className="media-body">
                 {reply.contents}

                 <hr />

                 <p className="reply-data">
                   Posted by {reply.authorUsername} on {unixTimeToString(reply.postDate)}
                 </p>

                 <Replies data={reply.replies} />
               </div>
             </li>
           );
         })}
      </ul>
    )
  }
}
