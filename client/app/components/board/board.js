import React from 'react';
import MainContent from '../maincontent';
import FeedItem from './feedItem.js';
import { Link } from 'react-router';
import {getBoardContent} from '../../server';
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
    getBoardContent(this.props.params.id, (boardData) => {
      //console.log(boardData.threads[0])
      boardData.threads = boardData.threads.reverse();
      this.setState(boardData);
      this.setState({contents: boardData.threads});
  });

    window.scrollTo(0, 0);
  }
  componentWillReceiveProps(nextProps){
    getBoardContent(nextProps.params.id, (boardData) => {
      //console.log(boardData.threads[0])
      this.setState(boardData);
      this.setState({contents: boardData.threads});
    });

    window.scrollTo(0, 0);
}
  render() {
    return (
      <MainContent title={this.state.name}>
            {this.state.contents.map((thread,i) => {
              // console.log(thread, i)
               return (

                   //console.log(obj);
                   <FeedItem user = {this.props.route.user} key={i} data= {thread}/>

               );
             })}

      </MainContent>
    )
  }
}
