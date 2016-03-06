import React from 'react';

import Message from './message';

export default class Conversation extends React.Component {
  render() {
    var data = this.props.data;
    return (
      <div className="conversation">
        {data.messages.map((message, i) => {
           return (
             <Message key={i} data={message} user={this.props.user} />
           )
         })}

             <form className="messaging-text-entry">
               <fieldset className="form-group">
                 <textarea className="form-control text-entry-title" defaultValue="Re: The Projectionist" rows="1" />
                 <textarea className="form-control text-entry-message" placeholder="Write a message..." rows="3"></textarea>
               </fieldset>
               <button type="submit" className="btn btn-primary pull-right">Submit</button>
             </form>
      </div>
    )
  }
}
