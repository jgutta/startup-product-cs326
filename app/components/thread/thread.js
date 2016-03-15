import React from 'react';
import MainContent from '../maincontent';
import Replies from './replies';
import { unixTimeToString } from '../../util';
import { getFullThreadData } from '../../server';


export default class Thread extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     };
  }

  refresh(props) {
    getFullThreadData(props.params.id, (threadData) => {
      this.setState(threadData);
    });
  }

  componentDidMount() {
    this.refresh(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.refresh(nextProps);
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
        <div />
      )
    }

    var thread = this.state.contents
    return (
      <MainContent title={thread.originalPost.title} info={this.commas(thread.boards)} >
        <div className="media original-post">
          <div className="media-left">
            <img className="media-object" src={thread.originalPost.img} />
          </div>
          <div className="media-body">
            {thread.originalPost.description}

            <div className="thread-data">
              <hr />

              <div className="col-sm-6">
                Posted by {thread.originalPost.authorUsername} on {unixTimeToString(thread.originalPost.postDate)}
              </div>
              <div className="col-sm-6 thread-comment-count">
                {thread.commentsNo} comments, {thread.viewsNo} views
              </div>
            </div>
          </div>
        </div>

        <hr className="content-title-separator" />

        <Replies data={thread.replies}/>
      </MainContent>
    )
  }
}
