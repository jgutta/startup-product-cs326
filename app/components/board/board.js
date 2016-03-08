import React from 'react';
import MainContent from '../maincontent';
import feedPost from './feedPost'
import { getBoardInfo } from '../../server';
export default class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    // Empty feed.
    contents: []
  };
  }
  componentDidMount() {

    getBoardInfo(1, (boardData) => {
      //console.log(boardData.threads[0])
      this.setState(boardData);
      this.setState({contents: boardData.threads})
  });
  }

  render() {
  //  console.log(JSON.stringify(this.state))
  //  console.log(this.state.threads)
    return (
      <MainContent title={this.state.name}>
        <ul className="list-group">
            {this.state.contents.map((thread) => {

               return (
                 <feedPost key={thread._id} threadID= {thread} />
               );
             })}
          </ul>
      </MainContent>
    )
  }
}
