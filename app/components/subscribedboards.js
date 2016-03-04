import React from 'react';

import { getSubscribedBoardsData } from '../server';

export default class SubscribedBoards extends React.Component {
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
    getSubscribedBoardsData(this.props.user, (subscribedBoardsData) => {
      // Note: setState does a *shallow merge* of the current state and the new
      // state. If state was currently set to {foo: 3}, and we setState({bar: 5}),
      // state would then be {foo: 3, bar: 5}. This won't be a problem here.
      this.setState(subscribedBoardsData);
    });
  }

  render() {
    return (
      <div className="panel panel-default content-panel">
        <div className="panel-heading">
          <h3 className="panel-title">Subscribed Boards</h3>
        </div>
        <div className="panel-body">
          <ul className="nav nav-pills nav-stacked">
            {this.state.contents.map((board) => {
               return (
                 <li role="presentation" key={board._id}>
                   <a href="#">{board.name}</a>
                 </li>
               );
             })}
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
