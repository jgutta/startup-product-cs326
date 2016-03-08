import React from 'react';
import MainContent from '../maincontent';
import {getAllBoards} from '../../server.js';
import BoardTab from './BoardTab.js';

export default class MainPage extends React.Component {

  constructor(props) {
    // super() calls the parent class constructor -- e.g. React.Component's constructor.
    super(props);
    // Set state's initial value.
    // Note that the constructor is the ONLY place you should EVER set state directly!
    // In all other places, use the `setState` method instead.
    // Setting `state` directly in other places will not trigger `render()` to run, so your
    // program will have bugs.
    this.state = {
      // Empty board data.
      contents: []
    };
  }

  componentDidMount() {
    getAllBoards((boardsData) => {
      // Note: setState does a *shallow merge* of the current state and the new
      // state. If state was currently set to {foo: 3}, and we setState({bar: 5}),
      // state would then be {foo: 3, bar: 5}. This won't be a problem here.
      this.setState({contents : boardsData});
    });
  }

  render() {
    var boardsList = this.state.contents; //list of all boards
    var tempBoard;
    return (
      <MainContent title="Welcome to UBoard">
          <div className= "panel panel-default">
            <div className="panel-body">
              <div className= "main-content-body">
                {boardsList.map((board, i) => {
                  if((i%2)===0 && i!==0){
                    return(
                      <div className="row">
                        <div className="col-md-6">
                          <BoardTab key={i-1} title={tempBoard.name} description={tempBoard.description} numUser={tempBoard.numUsers} numPosts={tempBoard.numPosts}/>
                        </div>
                        <div className="col-md-6">
                          <BoardTab key={i} title={board.name} description={board.description} numUser={board.numUsers} numPosts={board.numPosts}/>
                        </div>
                      </div>
                    );
                  }
                  else{
                    tempBoard = board;
                  }
                })}
              </div>
            </div>
          </div>
      </MainContent>
    )
  }
}
