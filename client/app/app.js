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

import ErrorBanner from './components/errorbanner';
import ResetDatabase from './components/resetdatabase';

class MessagingPage extends React.Component {
  render() {
    return <Messaging user={"000000000000000000000001"} />;
  }
}
class AccountSettingsPage extends React.Component {
  render() {
    return <AccountSettings user={"000000000000000000000001"} />;
  }
}
class CreateThreadPage extends React.Component {
  render() {
    return <CreateThread user={"000000000000000000000001"} />;
  }
}
class BoardsPage extends React.Component {
  render() {
    return <Board user={"000000000000000000000001"} />;
  }
}
class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />

        <div className="col-md-12">
          <ErrorBanner />
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2 left-sidebar">
              <SubscribedBoards user={"000000000000000000000001"} />
              <PinnedPosts user={"000000000000000000000001"} />
              <ResetDatabase />
            </div>

            <div className="col-sm-7">
              {this.props.children}
            </div>

            <div className="col-sm-3 right-sidebar">
              <div id="my-feed"></div>
              <Feed title="My Feed" user={"000000000000000000000001"} maxFeedPosts={4} />
              <Feed title="Community Feed" user={"000000000000000000000002"} maxFeedPosts={2} />
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
      <Route path='board' component={Board} user={"000000000000000000000001"}/>
      <Route path='boards/:id' component={Board} user={"000000000000000000000001"} />
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
