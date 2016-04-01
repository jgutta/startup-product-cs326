import React from 'react';
import { unixTimeToString } from '../../util';

export default class Message extends React.Component {
  render() {
    var data = this.props.data;

    var messageClassNames = 'panel panel-default message';
    if (this.props.user === data.author) {
      messageClassNames += ' message-outgoing';
    }
    else {
      messageClassNames += ' message-incoming';
    }

    return (
      <div className={messageClassNames}>
        <div className="panel-heading">
          <h3 className="panel-title">{data.title}</h3>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-12">
              {data.contents.split('\n').map((line) => {
                 return (
                   <p>{line}</p>
                 );
               })}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12 message-metadata">
              {data.authorUsername} - {unixTimeToString(data.postDate)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
