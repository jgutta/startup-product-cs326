import React from 'react';

import MainContent from '../maincontent';
import Conversation from './conversation';

import { getConversationsData } from '../../server';

export default class Messaging extends React.Component {
  constructor(props) {
    // super() calls the parent class constructor -- e.g. React.Component's constructor.
    super(props);
    // Set state's initial value.
    // Note that the constructor is the ONLY place you should EVER set state directly!
    // In all other places, use the `setState` method instead.
    // Setting `state` directly in other places will not trigger `render()` to run, so your
    // program will have bugs.
    this.state = {
      // Empty feed.
      contents: []
    };
  }

  componentDidMount() {
    getConversationsData(this.props.user, (conversationsData) => {
      // Note: setState does a *shallow merge* of the current state and the new
      // state. If state was currently set to {foo: 3}, and we setState({bar: 5}),
      // state would then be {foo: 3, bar: 5}. This won't be a problem here.
      this.setState(conversationsData);
    });
  }

  render() {
    if (!this.state.contents || !this.state.contents[0]) {
      return (
        <MainContent title="UBoard Messaging" />
      )
    }
    else {
      var conversation = this.state.contents[0]

      return (
        <MainContent title="UBoard Messaging">
          <div className="row">
            <div className="col-md-12">
              <ul className="nav nav-tabs">
                <li role="presentation" className="active"><a href="#" className="tab">
                  PIC cinemaloverno7
                  <button type="button" className="btn btn-default">
                    <span className="glyphicon glyphicon-remove-sign"></span>
                  </button>
                </a></li>
                <li role="presentation"><a href="#" className="tab">
                  PIC guitarist78
                  <button type="button" className="btn btn-default">
                    <span className="glyphicon glyphicon-remove-sign"></span>
                  </button>
                </a></li>
                <li role="presentation"><a href="#" className="tab">
                  PIC ilikemonopoly
                  <button type="button" className="btn btn-default">
                    <span className="glyphicon glyphicon-remove-sign"></span>
                  </button>
                </a></li>
                <li className="dropdown messaging-people-dropdown pull-right">
                  <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu">
                    <li><a href="#">PIC pizzzzaparty666</a></li>
                    <li><a href="#">PIC concertrocker\m/</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <Conversation data={conversation} />
        </MainContent>
      )
    }
  }
}
