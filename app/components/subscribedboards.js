import React from 'react';
import { Link } from 'react-router';
import { getSubscribedBoardsData, getBoardsData, addSubscribeBoard, deleteSubscribeBoard} from '../server';

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
      boardsList: [],
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
    getBoardsData((BoardsData) => {
      // Note: setState does a *shallow merge* of the current state and the new
      // state. If state was currently set to {foo: 3}, and we setState({bar: 5}),
      // state would then be {foo: 3, bar: 5}. This won't be a problem here.
      this.setState(BoardsData);
    });
  }

  getNotSubscribed(sub, all) {
    var nosub = [];
    var t;
    for(var i in all) {
      t=false;
      for(var j in sub) {
        if(all[i]._id === sub[j]._id) {
          t=true;
        }
      }
      if(!t) {
        nosub.push(all[i]);
      }
    }
    return nosub;
  }


    refresh() {
      getSubscribedBoardsData(this.props.user, (boardData) => {
        this.setState(boardData);
      });
    }

  handleSubmit(e, id) {
    e.preventDefault();
    addSubscribeBoard(this.props.user, id, () => {
      this.refresh();
    });
  }

  handleUnSub(e, id) {
    e.preventDefault();
    deleteSubscribeBoard(this.props.user, id, () => {
      this.refresh();
    });
  }

  onEmpty(){
    if(this.getNotSubscribed(this.state.contents, this.state.boardsList).length == 0){
      return "btn btn-default dropdown-toggle disabled";
    }
    else{return "btn btn-default dropdown-toggle";}
  }

  render() {
    var nosub = this.getNotSubscribed(this.state.contents, this.state.boardsList);
    var drop = this.onEmpty();
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
                   <Link to={"/boards/" + board._id}>
                     {board.name}
                     <i className="fa fa-minus-circle pull-right" onClick={(e) => this.handleUnSub(e, board._id)}></i>
                   </Link>
                 </li>
               );
             })}
          </ul>


          <div className="dropdown">

            <button className={drop} type="button" id="addBoardsMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              Add Board
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="addBoardsMenu">
              {nosub.map((board) => {
                 return (
                   <li role="presentation" key={board._id}>
                     <a href="#" onClick={(e) => this.handleSubmit(e, board._id)}>{board.name}</a>
                   </li>
                 );
               })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
