import React from 'react';
import { unixTimeToString } from '../../util';

export default class Message extends React.Component {
  render() {
    var data = this.props.data;

    return (
      <div className="panel panel-default message message-outgoing">
        <div className="panel-heading">
          <h3 className="panel-title">{data.title}</h3>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-12">{data.contents}</div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12 message-metadata">
              {data.author} - {unixTimeToString(data.postDate)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
