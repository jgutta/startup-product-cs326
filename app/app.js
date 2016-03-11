import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

import Navbar from './components/navbar';
import SubscribedBoards from './components/subscribedboards';
import PinnedPosts from './components/pinnedposts';
import Feed from './components/feed';

import MainPage from './components/mainpage/mainpage';
import Board from './components/board/board';
import Thread from './components/thread/thread';
import CreateThread from './components/createthread/createthread';
import Search from './components/search/search';
import Messaging from './components/messaging/messaging';
import AccountSettings from './components/accountsettings/accountsettings';

class MessagingPage extends React.Component {
  render() {
    return <Messaging user={1} />;
  }
}
class AccountSettingsPage extends React.Component {
    render() {
      return <AccountSettings user={1} />;
    }
}
class CreateThreadPage extends React.Component {
  render() {
    return <CreateThread user={1} />;
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2 left-sidebar">
              <SubscribedBoards user={1} />
              <PinnedPosts user={1} />
            </div>

            <div className="col-sm-7">
              {this.props.children}
            </div>

            <div className="col-sm-3 right-sidebar">
              <div id="my-feed"></div>
              <Feed title="My Feed" user={1} />
              <Feed title="Community Feed" user={2} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

render(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={MainPage} />
      <Route path='board' component={Board} />
      <Route path='boards/:id' component={Board} />
      <Route path='thread' component={Thread} />
      <Route path='threads/:id' component={Thread} />
      <Route path='createthread' component={CreateThreadPage} />
      <Route path='search' component={Search} />
      <Route path='messaging' component={MessagingPage} />
      <Route path='accountsettings' component={AccountSettingsPage} />
    </Route>
  </Router>,
  document.getElementById('app')
);
