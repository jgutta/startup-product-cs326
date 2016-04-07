import React from 'react';

export default class BoardTab extends React.Component {

  render(){
    return(
      <div className= "panel panel-default board-tab">
        <div className= "panel-heading board-tab-header">
          <center><h4>{this.props.title}</h4></center>
        </div>
        <div className= "panel-body board-tab-body">
          <div className="row board-tab-row">
            <div className="col-md-6 pic-col">
              <img src={this.props.boardImg} />
            </div>
            <div className="col-md-6">
              {this.props.description}
            </div>
          </div>
        </div>
        <hr />
        <div className= "board-footer">
          Followers: {this.props.numUsers} - Posts: {this.props.numPosts}
        </div>
      </div>
    )
  }
}
