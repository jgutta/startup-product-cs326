import React from 'react';
import MainContent from '../maincontent';
import Replies from './replies';
import { unixTimeToString } from '../../util';
import { getFullThreadData, retrieveNameFromId, postReply} from '../../server';


export default class Thread extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messageContentsValue: ''
     };
  }

  refresh(props){
    getFullThreadData(props.params.id, (threadData) =>{
      this.setState(threadData);
      this.setState({contents: threadData});
    });
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    this.refresh(this.props);
  }
  componentWillReceiveProps(nextProps){
    this.refresh(nextProps);
}

  checkOptionalInfo(){
    var op = this.state.contents.originalPost;
    if((op.date !== '') && (op.time !== '')){
      return(<div>  Date:  {op.date}, Time:  {op.time} <hr /> </div> )
    }
    else{
      if(op.date !== ''){
        return(<div>  Date:  {op.date} <hr /> </div>)
      }
      if(op.time !== ''){
        return(<div>  Time:  {op.time} <hr /> </div>)
      }
    }
  }

  handleClick(e){
    e.preventDefault();

  }

  handleReply(e){
    e.preventDefault();
    //console.log(this.state);
    //console.log(this.props);
    var messageContents = this.state.messageContentsValue.trim();
    if (messageContents !== ''){
      postReply(this.props.params.id,retrieveNameFromId(1), this.state.messageContentsValue, () => {
        this.refresh();
      });
    }

  }

  handleContentsChange(e) {
    e.preventDefault();
    this.setState({ messageContentsValue: e.target.value });
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
             {thread.originalPost.description}

             <div className="thread-data">
               <hr />

               <div >
                 Posted by {thread.originalPost.authorUsername} on {unixTimeToString(thread.originalPost.postDate)}
               </div>

             </div>
           </div>
         </div>

         <hr className="content-title-separator" />

          <textarea className="reply-box" rows="2" placeholder={'Reply to ' + thread.originalPost.title} />
          <br />
        <button type="button" className="btn btn-primary submit-btn pull-right">Submit</button>
        <br />
        <br />
        <Replies data={thread.replies}/>

        </MainContent>
    )
  }
}
//<Replies data={thread.replies}/>

/*
<div className = 'putRepliesHere'>
  {this.state.contents.replies.map((reps, i) => {
    return(
      <Replies key={i} rKey={i} data={reps} currUser='tim.richards'  />
    )
  })}
</div>
*/
