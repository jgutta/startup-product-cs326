import React from 'react';
import MainContent from '../maincontent';
import Replies from './replies';
//import { unixTimeToString } from '../../util';
import { getOPData } from '../../server';


export default class Thread extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      contents : []
    };
  }

  componentDidMount() {
    //this.refresh();
    getOPData(this.props.params.id, (threadData) => {
      this.setState(threadData);
      //this.setState({contents: threadData})
    } );
  }

  render() {
    console.log(this.state);

    return (
      <MainContent title= {this.state.originalPost.title} >
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
              Posted by <a href = "#">this.props.originalPost.author</a>.
              <br />
            </div>
          <hr />
        </div>
        <div>
          {this.state.contents.map((i) => {
             return (
               //how do i pull paramenters for these objs?
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
//

/*
  componentWillReceiveProps(nextProps){
    getThreadData(nextProps.params.id, (threadData) => {
      this.setState(threadData);
      //this.setState({contents: threadData.replies})
  });
} */

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
