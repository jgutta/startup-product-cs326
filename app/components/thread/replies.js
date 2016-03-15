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
                 {/* <img className="media-object" src={reply.authorImage} /> */}
                 <img className="media-object" src="img/default.png" />
               </div>
               <div className="media-body">
                 <div>{reply.contents}</div>

                 <Replies data={reply.replies} />
               </div>
             </li>
           );
         })}
      </ul>
    )
  }
}
