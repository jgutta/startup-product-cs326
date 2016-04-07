import React from 'react';
import MainContent from '../maincontent';
import Replies from './replies';
import { unixTimeToString } from '../../util';
import { getFullThreadData, postReply, postReplyToReply} from '../../server';


export default class Thread extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messageContentsValue: ''
     };
     this.setState = this.setState.bind(this);
  }

  refresh(){
    getFullThreadData(this.props.params.id, (threadData) =>{
      this.setState( threadData );
    });
  }

  componentDidMount() {
    this.refresh();
  }

  componentWillReceiveProps(nextProps){
    getFullThreadData(nextProps.params.id, (threadData) =>{
      this.setState(threadData);
    });
}

  checkOptionalInfo(){
    var op = this.state.contents.originalPost;
    if((op.date !== '') && (op.time !== '')){
      return(<div className="minor-OP-info">  Date:  {op.date}, Time:  {op.time} <hr /> </div> )
    }
    else{
      if(op.date !== ''){
        return(<div className="minor-OP-info">  Date:  {op.date} <hr /> </div>)
      }
      if(op.time !== ''){
        return(<div className="minor-OP-info">  Time:  {op.time} <hr /> </div>)
      }
    }
  }

  handleReply(e){
    e.preventDefault();
    //console.log(this.state);
    var messageContents = this.state.messageContentsValue.trim();
    if (messageContents !== ''){
      var thread = this.state.contents;
      postReply(thread._id, 1, this.state.messageContentsValue, (threadData) => {
        this.setState({ messageContentsValue: '' });
        this.setState(threadData);
      });
    }
  }

  handleReplyToReply(msg, threadId, replyId){
    var messageContents = msg.trim();
    var _this = this;
    if(messageContents !== ''){
      postReplyToReply(threadId, replyId, 1, messageContents, (threadData) => {
        _this.setState(threadData);
      });
    }
  }

  handleContentsChange(e) {
    e.preventDefault();
    this.setState({ messageContentsValue: e.target.value });
  }

  commas(array) {
     var str = '';
     for(var i = 0; i < array.length; i++) {
       if(i != array.length - 1) {
         str = str + array[i].name + ', ';
       }
       else {
         str = str + array[i].name;
       }
     }

     return(str);
   }

  render() {

      if(!this.state.contents){
        return (
          <div> </div>
        )
      }

    var thread = this.state.contents;
    return (
      <MainContent title={thread.originalPost.title} >
         <div className="media original-post">
           <div className="media-left">
             <img className="media-object" src={thread.originalPost.img} />
           </div>
           <div className="media-body">

            {this.checkOptionalInfo()}
             {thread.originalPost.description}

             <div className="thread-data">
               <hr />

               <div className="minor-OP-info">
                 Posted by {thread.originalPost.authorUsername} on {unixTimeToString(thread.originalPost.postDate)}
               </div>

             </div>
           </div>
         </div>

         <hr className="content-title-separator" />

          <textarea className="reply-box" rows="2" placeholder={'Reply to ' + thread.originalPost.title} value={this.state.messageContentsValue} onChange={(e) => this.handleContentsChange(e)} />

          <br />
        <button type="button" className="btn btn-primary submit-btn pull-right" onClick={(e) => this.handleReply(e)}> Submit </button>
        <br />
        <br />

          <Replies data={thread.replies} threadId={this.props.params.id} replyFunction={this.handleReplyToReply} />
          <hr className="content-title-separator" />
          <div>
          <div className="footer minor-OP-info pull-left">
            {thread.commentsNo} comments, {thread.viewsNo} views
          </div>
          <div className="footer pull-right">
            Posted to: {this.commas(thread.boards)}
          </div>
          </div>
        </MainContent>
    )
  }
}
