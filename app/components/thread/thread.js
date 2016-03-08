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
    var replies = []; //should be this state

    return (
      <MainContent title='this.state.originalPost.title'>
        <div>
          <div className="panel-body">
            <div className="row col-md-4">
            <img src="img/defaultDisplay.jpg" width="90%" />

        </div>

        <div className="col-md-8 title-head">
          <h4><small> unixTimeToString(this.props.originalPost.postDate) </small></h4>
        </div>


        <div className = "main-content-body">

          this.props.originalPost.contents
          <hr />
            <div className="footer">
              <div className="pull-left">
                <button type="replyBtn" className="btn btn-primary">
                  <span> Reply </span>
                </button>

              </div>
              Posted by <a href = "#">this.props.originalPost.author@UBoard</a>.
              <br />
            </div>
          <hr />
        </div>
        <div>
          {replies.map((i) => {
             return (
               //DEFINITION -nested replies[]?
               //!!these props should be maintained as comments are created
               <Replies key={i} rKey={i} author={5} contents="floopy d00p fibbity b0p" postDate={1456871392} replies={ [] } />
             )
           })}
        </div>
      </div>

        </div>
      </MainContent>
    )
  }
}
/*
1. how do i get passed images for OP -> databse, thread.originalPost.img
2. maintaining replies properties as created?
*/
