import React from 'react';
import MainContent from '../maincontent';
import FeedItem from './feedItem.js';
import {getBoardInfo} from '../../server';
export default class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    // Empty feed.
    contents: [],
    pinned: []
    //id: 0
  };
  }
  componentDidMount() {

    getBoardInfo(this.props.params.id, (boardData) => {
      //console.log(boardData.threads[0])
      boardData.threads = boardData.threads.reverse();
      this.setState(boardData);
      this.setState({contents: boardData.threads})

  });

  }
  componentWillReceiveProps(nextProps){
    getBoardInfo(nextProps.params.id, (boardData) => {
      //console.log(boardData.threads[0])
      this.setState(boardData);
      this.setState({contents: boardData.threads})
  });
}
/*pinPost(userID,threadID){
  addPinnedPost(userID,threadID, (pinnedData) => {
    this.setState({pinned: pinnedData});

    console.log(this.state);
  });
}
unPinPost(userID, threadID){
  delPinnedPost(userID,threadID, (pinnedData) => {
    this.setState({pinned: pinnedData});

    console.log(this.state);
  })
}*/
//  console.log(this.state.threads)
  render() {
    return (
      <MainContent title={this.state.name}>

            {this.state.contents.map((thread,i) => {
              // console.log(thread, i)
               return (

                   //console.log(obj);
                   <FeedItem key={i} data= {thread}/>

               );
             })}

      </MainContent>
    )
  }
}
