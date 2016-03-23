import React from 'react';
import MainContent from '../maincontent';
//import Replies from './replies';
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
      <MainContent title= {thread.originalPost.title} >
        <div>
          <div className="panel-body">
            <div className="row col-md-4">
            <img src={thread.originalPost.img} width="90%" />

        </div>
        {this.checkOptionalInfo()}

        <div className = "main-content-body">

          {thread.originalPost.description}
          <hr />
            <div className="footer">
              <div className="pull-left pl00f">
                <button type="replyBtn" className="btn btn-primary" >
                  <span> Reply </span>
                </button>

              </div>
              Posted by <a href = "#"> {retrieveNameFromId(thread.originalPost.author)}</a>, on {unixTimeToString(thread.originalPost.postDate)}.
              <br />
            </div>
            <div className="replyArea pull-right">
            <textarea className="replyArea" rows={2} value={this.state.messageTitleValue} onChange={(e) => this.handleContentsChange(e)} />
              <button type="replyBtn" className="btn btn-primary" onClick={(e) => this.handleReply(e)}>
                Submit
              </button>
            </div>
        </div>
        //replies
      </div>

        </div>
      </MainContent>
    )
  }
}
/*
<div className = 'putRepliesHere'>
  {this.state.contents.replies.map((reps, i) => {
    return(
      <Replies key={i} rKey={i} data={reps} currUser='tim.richards'  />
    )
  })}
</div>
*/
