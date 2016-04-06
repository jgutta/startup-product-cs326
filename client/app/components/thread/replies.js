import React from 'react';
import { unixTimeToString } from '../../util';

export default class Replies extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editReply: false,
      messageContentsValue: ''
    };
  }

  toggleReply(){
    this.setState({editReply: !this.state.editReply});
  }

  handleContentsChange(e) {
    e.preventDefault();
    this.setState({ messageContentsValue: e.target.value });
  }

  handleReply(e, replyId){
    //toggle/clear stuff
    e.preventDefault();
    console.log(this.props.data);
    console.log(this.state);
    //how do i access id? data is array...
    var msg = this.state.messageContentsValue;
    this.setState({ messageContentsValue: '' });
    this.props.replyFunction(msg, this.props.threadId, replyId);
  }

  render() {
    var data = this.props.data;

    return(
      <ul className="media-list reply-list">
        {data.map((reply) => {
           return (
             <li className="media" key={reply._id}>
               <div className="media-left">
                 <img className="media-object img-rounded" src={reply.authorImage} />
               </div>
               <div className="media-body">
                 {reply.contents}

                 <hr />

                 <span className="reply-data">
                   Posted by {reply.authorUsername} on {unixTimeToString(reply.postDate)}
                 </span>

                 <button type="button" className="btn btn-primary reply-btn" onClick={this.toggleReply.bind(this)}> Reply </button>

                 <div className="toggleReplyArea">

                   {this.state.editReply
                    ? <div>
                     <br />
                     <textarea className="reply-box" rows="2" placeholder={'Reply to this post'} onChange={(e) => this.handleContentsChange(e)} />
                     <button type="button" className="btn btn-primary rep-btn" onClick={(e) => this.handleReply(e, reply._id)}> Submit </button>
                    </div>

                    : <div> </div>
                   }
                 </div>

                 <Replies data={reply.replies} threadId={this.props.threadId} replyFunction={this.props.replyFunction} />
               </div>
             </li>
           );
         })}
      </ul>
    )
  }

}
//adding "value" to textarera lets you edit all at once....
//not necessary to post
//value={this.state.messageContentsValue}
