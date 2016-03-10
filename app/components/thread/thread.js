import React from 'react';
import MainContent from '../maincontent';
//import Replies from './replies';
import { unixTimeToString } from '../../util';
import { getThreadData} from '../../server';


export default class Thread extends React.Component {
  constructor(props){
    super(props);
    this.state = { };
  }

  componentDidMount() {
    getThreadData(this.props.params.id, (threadData) => {
        console.log(threadData);
      this.setState(threadData);
      this.setState({contents: threadData})
    } );
      //console.log(this.props.params.id);
  }

  render() {
    //console.log(this.props.params.id);
      if(!this.state.contents){
        return (
          <div> </div>
        )
      }
        //console.log(this.state);
    return (
      <MainContent title= {this.state.contents.originalPost.title} >
        <div>
          <div className="panel-body">
            <div className="row col-md-4">
            <img src="img/defaultDisplay.jpg" width="90%" />

        </div>

        <div className="col-md-8 title-head">
          <h4><small> {unixTimeToString(this.state.contents.originalPost.postDate)} </small></h4>
        </div>


        <div className = "main-content-body">

          {this.state.contents.originalPost.description}
          <hr />
            <div className="footer">
              <div className="pull-left">
                <button type="replyBtn" className="btn btn-primary">
                  <span> Reply </span>
                </button>

              </div>
              Posted by <a href = "#"> {this.state.contents.originalPost.author} </a>.
              <br />
            </div>
          <hr />
        </div>
        <div className = 'putShitHere'>

        </div>
      </div>

        </div>
      </MainContent>
    )
  }
}
/*{this.state.contents.map((i) => {
   return (
     //how do i pull paramenters for these objs?
     <Replies key={i} rKey={i} author={5} contents="floopy d00p fibbity b0p" postDate={1456871392} replies={ [] } />
   )
 })} */
