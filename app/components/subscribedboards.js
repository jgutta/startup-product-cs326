import React from 'react';

export default class SubscribedBoards extends React.Component {
  render() {
    return (
      <div className="panel panel-default content-panel">
        <div className="panel-heading">
          <h3 className="panel-title">Subscribed Boards React!</h3>
        </div>
        <div className="panel-body">
          <ul className="nav nav-pills nav-stacked">
            <li role="presentation"><a href="#">Concerts</a></li>
            <li role="presentation"><a href="#">Videogames</a></li>
            <li role="presentation"><a href="#">RSOs</a></li>
            <li role="presentation"><a href="#">Local Events</a></li>
          </ul>

          <div className="dropdown">
            <button className="btn btn-default dropdown-toggle" type="button" id="addBoardsMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              Add Board
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="addBoardsMenu">
              <li><a href="#">General</a></li>
              <li><a href="#">Movies</a></li>
              <li><a href="#">Sports</a></li>
              <li><a href="#">Studying</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
