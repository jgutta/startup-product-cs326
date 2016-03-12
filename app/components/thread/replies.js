import React from 'react';
import {getRepliesData} from '../../server';
import { unixTimeToString } from '../../util';

export default class Replies extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props);
    this.state = {

     };
    //console.log(this.state);
    //console.log(this.props.rKey);
    //console.log(this.props.data);
  }

  componentDidMount() {
    getRepliesData(this.props.rKey, (replyData) => {
      this.setState(replyData);
      this.setState({contents: replyData})
    } );
  }
  //Write a function that recrsively retrieves children info and creates boxes for each
  getChildrenReplies() {
  //  console.log(this.state);
    var childReplies = this.props.data.replies;
    if(childReplies.length < 1){
      return(<div> </div>)
    }
     // This is an array. MOVE THROUGH EVERY ELEMENT
    for (var i=0; i<childReplies.length; i++){
    return(
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
                  <h4><a href = "#">{childReplies[i].author}</a>   <small> said: </small></h4>

                </div>
                <br />
                <br />
                {childReplies[i].contents}
                <hr />
                 {unixTimeToString(childReplies[i].postDate)}

        </div>
      </div>
    ) }
  }

  render(){
    //console.log(this.state);
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

      <div>
        {this.getChildrenReplies()}

      </div>

      </div>

    )
  }

}
