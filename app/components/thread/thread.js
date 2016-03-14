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
        
      </MainContent>
    )
  }
}
