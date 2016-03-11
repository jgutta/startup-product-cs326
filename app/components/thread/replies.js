import React from 'react';
import {getRepliesData} from '../../server';
import { unixTimeToString } from '../../util';

export default class Replies extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      contents: []
     };
    console.log(this.state);
    //console.log(this.props.rKey);
    //console.log(this.props.data);
  }

  componentDidMount() {
    getRepliesData(this.props.rKey, (replyData) => {
        //console.log(replyData);
      this.setState(replyData);
      this.setState({contents: replyData})
    } );
  }

  render(){
    console.log(this.state);
    return(
      //!!have to eliminate "pull-right"
        //I need to create custom indentation, but when do i hit bedrock?
        <div>
      <div className="replyF reply panel panel-default replyC col-md-9 pull-right">
       <div className="row col-md-4 rep">
                  <center>
                  <img src = "img/default_profile_pic.png" width = "75%" />
                  <br />
                   <button type="replyBtn" className="btn btn-primary">
                    <span> Reply </span>
                  </button></center>
              </div>

              <div className="col-md-8 title-head">
                <h4><a href = "#">{this.props.data.author}</a>   <small> said: </small></h4>

              </div>
              <br />
              <br />
              {this.props.data.contents}
              <hr />
               {unixTimeToString(this.props.data.postDate)}
      </div>

      <div className="replyF reply panel panel-default replyC col-md-9 pull-right">
        {this.state.contents.replies.map((reps, i) => {
          return(
          <Replies key={i} rKey={i} data={reps} currUser='tim.richards'  />
        )
        })}
      </div>
    </div>
    )
  }

}
