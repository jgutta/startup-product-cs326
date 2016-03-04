import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import MainPage from './components/mainpage/mainpage';
import Board from './components/board/board';
import Thread from './components/thread/thread';
import CreateThread from './components/createthread/createthread';
import Search from './components/search/search';
import Messaging from './components/messaging/messaging';
import AccountSettings from './components/accountsettings/accountsettings';

import SubscribedBoards from './components/subscribedboards';
import PinnedPosts from './components/pinnedposts';
import Feed from './components/feed';

render(
  <Router history={hashHistory}>
    <Route path='/' component={MainPage} />
    <Route path='index' component={MainPage} />
    <Route path='board' component={Board} />
    <Route path='thread' component={Thread} />
    <Route path='createthread' component={CreateThread} />
    <Route path='search' component={Search} />
    <Route path='messaging' component={Messaging} />
    <Route path='accountsettings' component={AccountSettings} />
  </Router>,
  document.getElementById('main-content')
);

render(
  <SubscribedBoards user={1} />,
  document.getElementById('subscribed-boards')
);
render(
  <PinnedPosts user={1} />,
  document.getElementById('pinned-posts')
);
render(
  <Feed title='My Feed' user={1} />,
  document.getElementById('my-feed')
);
render(
  <Feed title='Community Feed' user={2} />,
  document.getElementById('community-feed')
);
