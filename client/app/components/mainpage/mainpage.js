import React from 'react';
import MainContent from '../maincontent';
import {getBoardsData} from '../../server.js';
import BoardTab from './BoardTab.js';
import { Link } from 'react-router';

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
    getBoardsData((boardsData) => {
      // Note: setState does a *shallow merge* of the current state and the new
      // state. If state was currently set to {foo: 3}, and we setState({bar: 5}),
      // state would then be {foo: 3, bar: 5}. This won't be a problem here.
      var boardsList = boardsData.boardsList;
      this.setState({contents : boardsList});
    });
  }

  render() {
    var boardsList = this.state.contents; //list of all boards
    var tempBoard;
    var holdTemp = true;
    return (
      <MainContent title="Welcome to UBoard">
              <div className= "main-page-body">
                {boardsList.map((board, i) => {

                  if(i===10){
                    return(
                      <div className="row">
                        <div className="col-md-6 board-col">
                          <Link to={"/boards/" + board._id}>
                            <BoardTab key={i} title={board.name} description={board.description} numUsers={board.numUsers} numPosts={board.numPosts} boardImg={board.image} boardID={board._id}/>
                          </Link>
                        </div>
                      </div>
                    );
                  }else if(holdTemp === false){
                    holdTemp = true;
                    return(
                      <div className="row">
                        <div className="col-md-6 board-col">
                          <Link to={"/boards/" + tempBoard._id}>
                            <BoardTab key={i-1} title={tempBoard.name} description={tempBoard.description} numUsers={tempBoard.numUsers} numPosts={tempBoard.numPosts} boardImg={tempBoard.image} boardID={tempBoard._id}/>
                          </Link>
                        </div>
                        <div className="col-md-6 board-col">
                          <Link to={"/boards/" + board._id}>
                            <BoardTab key={i} title={board.name} description={board.description} numUsers={board.numUsers} numPosts={board.numPosts} boardImg={board.image} boardID={board._id}/>
                          </Link>
                        </div>
                      </div>
                    );
                  }else{
                    holdTemp = false;
                    tempBoard = board
                  }

                })}
              </div>

      </MainContent>
    )
  }
}
