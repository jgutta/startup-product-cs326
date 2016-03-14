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

  componentDidMount() {
    getFullThreadData(this.props.params.id, (threadData) => {
      this.setState(threadData);
    });
  }

  render() {
    if(!this.state.contents){
      return (
        <div />
      )
    }

    return (
      <MainContent title= {this.state.contents.originalPost.title} >
        
      </MainContent>
    )
  }
}
