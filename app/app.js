import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';

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
  <Router>
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
  <SubscribedBoards />,
  document.getElementById('subscribed-boards')
);
render(
  <PinnedPosts>
    <a href="#">Concert at Herter</a>
    <a href="#">Smash at Sylvan</a>
    <a href="#">Anyone want to jam? (Drummer)</a>
    <a href="#">RSO Movie Night</a>
  </PinnedPosts>,
  document.getElementById('pinned-posts')
);
render(
  <Feed title='MyFeed React!' />,
  document.getElementById('my-feed')
);
render(
  <Feed title='Community Feed React!' />,
  document.getElementById('community-feed')
);
