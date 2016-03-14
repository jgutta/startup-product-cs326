import React from 'react';
import MainContent from '../maincontent';
import Replies from './replies';
import { unixTimeToString } from '../../util';
import { } from '../../server';


export default class Thread extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     };
  }

  componentDidMount() {

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
