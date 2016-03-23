import React from 'react';
import {getRepliesData, retrieveNameFromId, retrievePicFromId} from '../../server';
import { unixTimeToString } from '../../util';

export default class Replies extends React.Component {
  constructor(props){
    super(props);
    //console.log(this.props);
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
                    <img src = {retrievePicFromId(childReplies[i].author)} width = "75%" />
                    <br />
                     <button type="replyBtn" className="btn btn-primary">
                      <span> Reply </span>
                    </button></center>
                </div>

                <div className="col-md-8 title-head">
                  <h4><a href = "#"> { retrieveNameFromId(childReplies[i].author)}</a>   <small> said: </small></h4>

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

  render() {
     var data = this.props.data;

     return(
       <ul className="media-list reply-list">
         {data.map((reply) => {
             return (
               <li className="media" key={reply._id}>
                 <div className="media-left">
                  <img className="media-object img-rounded" src={reply.authorImage} />
                 </div>
                 <div className="media-body">

                  {reply.contents}

                  <hr />

                  <p className="reply-data">
                    Posted by {reply.authorUsername} on {unixTimeToString(reply.postDate)}
                  </p>

                   <Replies data={reply.replies} />
                 </div>
              </li>
            );
          })}
       </ul>
     )
   }

}
