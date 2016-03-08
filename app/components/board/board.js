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
      this.setState(boardData);
      //this.setState({contents: boardData.threads})
  });
  }

  render() {
    return (
      <MainContent title={this.state.name}>
        {this.state.threads}
        <ul className="list-group">
            {this.state.contents.map((thread) => {
               return (
                 <feedPost key={thread._id} thread= {thread} />
               );
             })}
          </ul>
      </MainContent>
    )
  }
}
