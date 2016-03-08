import React from 'react';
import MainContent from '../maincontent';
import Replies from './replies';
import { unixTimeToString } from '../../util';


export default class Thread extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      replies : []
    };
  }

  //important methods here (onClick, refresh, ect.)

  render() {
    var replies = this.state.replies;

    return (
      <MainContent title="Thread">
        <div className = "panel-body panel panel-default">
          <div className="panel-body">
            <div className="row col-md-4">
              //**passed from John?
            <img src="img/defaultDisplay.jpg" width="90%" />

        </div>

        <div className="col-md-8 title-head">
          <h4> {this.props.originalPost.title} </h4>
          //**related to John?
          <h4><small> {unixTimeToString(this.props.originalPost.postDate)} </small></h4>
        </div>


        <div className = "main-content-body">

          {this.props.originalPost.contents}
          <hr />
            <div>
              <div className="pull-left">
                <button type="replyBtn" className="btn btn-primary">
                  <span> Reply </span>
                </button>
              </div>
              Posted by <a href = "#">{this.props.originalPost.author}@UBoard</a>.
            </div>
          <hr />
        </div>
      </div>

        //replies here
        <div>
          {replies.map((i) => {
             return (
               //DEFINITION, key, author, contents
               <Replies key={i} rKey={i}  />
             )
           })}
        </div>

        </div>
      </MainContent>
    )
  }
}
