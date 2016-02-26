import React from 'react';

import FeedPost from './feedpost';

export default class Feed extends React.Component {
  render() {
    return (
      <div className="panel panel-default content-panel">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.title}</h3>
        </div>
        <div className="panel-body">
          <ul className="list-group">

            <FeedPost title="Concert at Herter" postTime="5 hours" commentsNo="15" viewsNo="37">
              Lorem ipsum dolor sit amet, consectetur...
            </FeedPost>

            <FeedPost title="Smash at Sylvan" postTime="3 hours" commentsNo="9" viewsNo="24">
              Suspendisse accumsan posuere neque, vitae...
            </FeedPost>

            <FeedPost title="Anyone want to jam?..." postTime="11 hours" commentsNo="14" viewsNo="30">
              Aenean non urna tempor, faucibus massa vel,...
            </FeedPost>

            <FeedPost title="RSO Movie Night" postTime="1 day" commentsNo="10" viewsNo="43">
              Nullam luctus consequat magna, a consequat...
            </FeedPost>

          </ul>
          <nav>
            <ul className="pager">
              <li><a href="#">More...</a></li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
