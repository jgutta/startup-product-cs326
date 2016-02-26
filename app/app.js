import React from 'react';
import ReactDOM from 'react-dom';

import MainContent from './components/maincontent';
import SubscribedBoards from './components/subscribedboards';
import PinnedPosts from './components/pinnedposts';
import Feed from './components/feed';

ReactDOM.render(
  <MainContent title="UBoard React!">React content</MainContent>,
  document.getElementById('main-content')
);

ReactDOM.render(
  <SubscribedBoards />,
  document.getElementById('subscribed-boards')
);

ReactDOM.render(
  <PinnedPosts />,
  document.getElementById('pinned-posts')
);

ReactDOM.render(
  <Feed title="My Feed React!" />,
  document.getElementById('my-feed')
);

ReactDOM.render(
  <Feed title="Community Feed React!" />,
  document.getElementById('community-feed')
);
