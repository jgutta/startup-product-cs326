import React from 'react';
import MainContent from '../maincontent';
//import feedItem from './feedItem'
import FeedPost from '../feedpost';
import { getBoardInfo} from '../../server';
export default class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    // Empty feed.
    contents: []
    //id: 0
  };
  }
  componentDidMount() {

    getBoardInfo(this.props.params.id, (boardData) => { // currently hardcoded to get board one, in the future this will be a prop.
      //console.log(boardData.threads[0])
      this.setState(boardData);
      this.setState({contents: boardData.threads})

  });
  }
  componentWillReceiveProps(nextProps){
    getBoardInfo(nextProps.params.id, (boardData) => { // currently hardcoded to get board one, in the future this will be a prop.
      //console.log(boardData.threads[0])
      this.setState(boardData);
      this.setState({contents: boardData.threads})
  });
}
//  console.log(this.state.threads)
  render() {
    return (
      <MainContent title={this.state.name}>
        <ul className="list-group">
            {this.state.contents.map((thread,i) => {
              // console.log(thread, i)
               return (

                   //console.log(obj);
                   <FeedPost key={i} data= {thread}/>

               );
             })}
          </ul>
      </MainContent>
    )
  }
}
