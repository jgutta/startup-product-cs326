import React from 'react';

import Message from './message';

import { getConversationData, postMessage } from '../../server';

export default class Conversation extends React.Component {
  constructor(props) {
    super(props);

    var data = this.props.data;

    var defaultTitle = 'Re: '
    if (data.messages.length > 0) {
      defaultTitle = data.messages[data.messages.length - 1].title;
    }

    this.state = {
      loaded: false,
      messageTitleValue: defaultTitle,
      messageContentsValue: '',
      conversation: {
        messages: []
      }
    };
  }

  refresh() {
    getConversationData(this.props.user, this.props.conversationId, (conversationData) => {
      conversationData.loaded = true
      this.setState(conversationData);
    });
  }

  componentDidMount() {
    this.refresh();
  }

  handleTitleChange(e) {
    e.preventDefault();
    this.setState({ messageTitleValue: e.target.value });
  }

  handleContentsChange(e) {
    e.preventDefault();
    this.setState({ messageContentsValue: e.target.value });
  }

  handlePost(e) {
    e.preventDefault();

    var messageTitle = this.state.messageTitleValue.trim();
    var messageContents = this.state.messageContentsValue.trim();

    if (messageContents !== '') {
      postMessage(this.props.conversationId, this.props.user, messageTitle, messageContents, () => {
        this.refresh();
      });
    }

    this.setState({
      messageTitleValue: messageTitle,
      messageContentsValue: ''
    });
  }

  render() {
    var conversation = this.state.conversation;

    if (!this.state.loaded) {
      return (
        <div style={{ height: '500px' }}></div>
      )
    }

    if (conversation.messages.length < 1) {
      return (
        <div className="conversation">
          <h3 className="no-messages-alert">There are no messages in this conversation yet...</h3>

          <form className="messaging-text-entry">
            <fieldset className="form-group">
              <textarea className="form-control text-entry-title" rows="1" value={this.state.messageTitleValue} onChange={(e) => this.handleTitleChange(e)} />
              <textarea className="form-control text-entry-message" placeholder="Write a message..." rows="3" value={this.state.messageContentsValue} onChange={(e) => this.handleContentsChange(e)} />
            </fieldset>
            <button type="submit" className="btn btn-primary pull-right" onClick={(e) => this.handlePost(e)}>Submit</button>
          </form>
        </div>
      )
    }

    return (
      <div className="conversation">
        <div>
        {conversation.messages.map((message, i) => {
           return (
             <Message key={i} data={message} user={this.props.user} />
           )
         })}
        </div>

        <form className="messaging-text-entry">
          <fieldset className="form-group">
            <textarea className="form-control text-entry-title" rows="1" value={this.state.messageTitleValue} onChange={(e) => this.handleTitleChange(e)} />
            <textarea className="form-control text-entry-message" placeholder="Write a message..." rows="3" value={this.state.messageContentsValue} onChange={(e) => this.handleContentsChange(e)} />
          </fieldset>
          <button type="submit" className="btn btn-primary pull-right" onClick={(e) => this.handlePost(e)}>Submit</button>
        </form>
      </div>
    )
  }
}
