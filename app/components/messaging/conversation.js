import React from 'react';

import Message from './message';

export default class Conversation extends React.Component {
  render() {
    var data = this.props.data;

    var defaultTitle = 'Re: '
    if (data.messages.length > 0) {
      defaultTitle = data.messages[data.messages.length - 1].title;
    }

    return (
      <div className="conversation">
        <div>
        {data.messages.map((message, i) => {
           return (
             <Message key={i} data={message} user={this.props.user} />
           )
         })}
        </div>

        <form className="messaging-text-entry">
          <fieldset className="form-group">
            <textarea className="form-control text-entry-title" defaultValue={defaultTitle} rows="1" />
            <textarea className="form-control text-entry-message" placeholder="Write a message..." rows="3" />
          </fieldset>
          <button type="submit" className="btn btn-primary pull-right">Submit</button>
        </form>
      </div>
    )
  }
}
