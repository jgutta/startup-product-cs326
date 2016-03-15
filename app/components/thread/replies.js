import React from 'react';
import { unixTimeToString } from '../../util';

export default class Replies extends React.Component {
  render() {
    var data = this.props.data;

    return(
      <div>
        {data.map((reply) => {
           return (
             <Replies key={reply._id} data={reply.replies} />
           );
         })}
      </div>
    )
  }
}
