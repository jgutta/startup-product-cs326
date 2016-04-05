import React from 'react';
import {getFullThreadData} from '../../server';
import { unixTimeToString } from '../../util';

export default class Replies extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editReply: false,
      messageContentsValue: ''
    };
  }

  refresh(props) {
    getFullThreadData(props.threadId, (threadData) =>{
      this.setState(threadData);
      this.setState({ contents: threadData });
    });
  }

  componentDidMount() {
    this.refresh(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.refresh(nextProps);
  }

  toggleReply(){
    this.setState({editReply: !this.state.editReply});
  }

  handleContentsChange(e) {
    e.preventDefault();
    this.setState({ messageContentsValue: e.target.value });
  }

  handleReply(e){
    e.preventDefault();
    //worry about the rest later, there are problems to fix
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

                   {this.state.togglReply}
                   {this.state.editReply
                    ? <div>
                     <br />
                     <textarea className="reply-box" rows="2" placeholder={'Reply to this post'}  onChange={(e) => this.handleContentsChange(e)} />
                     <button type="button" className="btn btn-primary rep-btn" onClick={(e) => this.handleReply(e)}> Submit </button>
                    </div>

                    : <div> </div>
                   }
                 </div>

                 <Replies data={reply.replies} />
               </div>
             </li>
           );
         })}
      </ul>
    )
  }

}
