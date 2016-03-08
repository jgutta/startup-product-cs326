import React from 'react';
import MainContent from '../maincontent';
//import { getBoardsSync } from '../server';
export default class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    // Empty feed.
    contents: []
  };
  }
//  componentDidMount() {
  //  getBoardsSync(this.props.user, (boardData) => {
      // Note: setState does a *shallow merge* of the current state and the new
      // state. If state was currently set to {foo: 3}, and we setState({bar: 5}),
      // state would then be {foo: 3, bar: 5}. This won't be a problem here.
    //  this.setState(boardData);
  //  });
//  }

  render() {
    return (
      <MainContent title="Board">Board</MainContent>
    )
  }
}
