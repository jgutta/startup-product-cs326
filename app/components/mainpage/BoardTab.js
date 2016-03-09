import React from 'react';

export default class BoardTab extends React.Component {

  render(){
    return(
      <div className= "panel panel-default">
        <div className= "panel-heading">
          <center><h4>{this.props.title}</h4></center>
        </div>
        <div className= "panel-body board-img">
          {this.props.boardImage}
          {this.props.description}
          <hr />
          <div className= "board-footer">
            Users: {this.props.numUsers} Posts: {this.props.numPosts}
          </div>
        </div>
      </div>
    )
  }
}
