import React from 'react';
import MainContent from '../maincontent';
import Replies from './replies';
import { unixTimeToString } from '../../util';
import { getThreadData } from '../../server';


export default class Thread extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      contents : []
    };
  }

  refresh() {
    getThreadData(this.props.threadId, (threadData) => {
      this.setState(threadData);
    } );
  }

  componentDidMount() {
    this.refresh();
  }

  //when reply is clicked, it opens a window to post comment
  //!!
  /*
  onClick(e){
    // make popup with textfield
    //call handle reply
  } */

  //when you hit enter - after opening the text window and entering text - posts comment in replies[]
  /*
  handleReply(e) {
      e.preventDefault();
      var replies =  this.state.replies;
      var replyText = replies.contents;
      if(replyText !== ''){
        //!!current time: var time = new Date().getTime();
        //!!postThreadReply()
      }
  } */

  render() {
    var replies = this.state.replies;

    return (
      <MainContent>
        <div className = "panel-body panel panel-default">
          <div className="panel-body">
            <div className="row col-md-4">
              //**passed from John/Evan?
            <img src="img/defaultDisplay.jpg" width="90%" />

        </div>

        <div className="col-md-8 title-head">
          //!!!i dont have this info, will change to mock data tonight.
            //creates 'undefined' errors
          <h4> {this.state.originalPost.title} </h4>
          //**related to John/Evan?
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
               //DEFINITION -nested replies[]?
               //!!temporarily define explicitly
               <Replies key={i} rKey={i} author={5} contents="floopy d00p fibbity b0p" postDate={1456871392} replies={ [] } />
             )
           })}
        </div>

        </div>
      </MainContent>
    )
  }
}
