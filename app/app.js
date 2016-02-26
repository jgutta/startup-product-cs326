import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';

import MainPage from './components/mainpage';
import Messaging from './components/messaging';

import SubscribedBoards from './components/subscribedboards';
import PinnedPosts from './components/pinnedposts';
import Feed from './components/feed';

render(
  <Router>
    <Route path="/" component={MainPage} />
    <Route path="index" component={MainPage} />
    <Route path="messaging" component={Messaging} />
  </Router>,
  document.getElementById('main-content')
);

render(
  <SubscribedBoards />,
  document.getElementById('subscribed-boards')
);
render(
  <PinnedPosts />,
  document.getElementById('pinned-posts')
);
render(
  <Feed title="My Feed React!" />,
  document.getElementById('my-feed')
);
render(
  <Feed title="Community Feed React!" />,
  document.getElementById('community-feed')
);
