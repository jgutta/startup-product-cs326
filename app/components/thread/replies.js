import React from 'react';
import { unixTimeToString } from '../../util';
//import OnCLick & handlepost from thread.js

export default class Replies extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      replies : []
    };
  }

  //handle replies to replies with onClick & handlePost.
    //may have to create seperate method for replies to replies

  render(){
    return(
      //!!have to eliminate "pull-right"
        //I need to create custom indentation, but when do i hit bedrock?
      <div className="replyF reply panel panel-default replyC col-md-9 pull-right">
       <div className="row col-md-4">
                  
                  <a href = "#"><img src = "img/default_profile_pic.png" width = "75%" /></a>
                  <button type="replyBtn" className="btn btn-primary">
                    <span> Reply </span>
                  </button>
              </div>

              <div className="col-md-8 title-head">
                <h4><a href = "#">this.props.author</a>   <small> said: </small></h4>

              </div>
              <br />
              <br />
              this.props.contents
              <br />
               Posted on unixTimeToString(this.props.postDate)

      </div>
    )
  }

}
