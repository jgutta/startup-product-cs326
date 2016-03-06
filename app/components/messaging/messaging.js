import React from 'react';

import MainContent from '../maincontent';
import Conversation from './conversation';

import { getConversationsData } from '../../server';

var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

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
    if (!this.state.contents || !this.state.contents.length > 0) {
      return (
        <MainContent title="UBoard Messaging" />
      )
    }
    else {
      return (
        <MainContent title="UBoard Messaging">
          <Tabs selectedIndex={0}>
            <TabList>
              {this.state.contents.map((conversation) => {
                 return (
                   <Tab key={conversation._id}>{conversation.user}</Tab>
                 );
               })}
            </TabList>


            {this.state.contents.map((conversation) => {
               return (
                 <TabPanel key={conversation._id}>
                   <Conversation data={conversation} user={this.props.user} />
                 </TabPanel>
               );
             })}
          </Tabs>
        </MainContent>
      )
    }
  }
}
