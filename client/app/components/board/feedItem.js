import React from 'react';
import { Link } from 'react-router';
import { unixTimeFromNow } from '../../util';
import {deletePinnedPost, addPinnedPost, getPinnedPostsData} from '../../server';
export default class FeedItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    // Empty feed.S
    author: '',
    pinned: []
    //id: 0
  };
  }
  componentDidMount() {
    getPinnedPostsData(this.props.user, (pinnedNew) =>{
      this.setState({pinned: pinnedNew})
    })

  }
  isPinned(){
    var pinned = this.state.pinned.contents;
    var bool = false;
    for(var i in pinned){
      if(pinned[i]._id === this.props.data._id)
        bool = true;
    }
    return bool;
  }
  handlePinClick(clickEvent){
    console.log(this.state.pinned);
    clickEvent.preventDefault();
    if(clickEvent.button === 0){

      if(this.isPinned())
        deletePinnedPost(this.props.user, this.props.data._id, (pinn) =>{
          console.log(pinn);
          this.setState({pinned: pinn});
        });
      else
        addPinnedPost(this.props.user, this.props.data._id, (pinn) => {
          this.setState({pinned: pinn});
        });
    }
    console.log(this.state.pinned);
  }

  render() {
    var pin = 'Pin This Post'
    if(this.isPinned())
      pin = 'Unpin This Post'
    var data = this.props.data;

    return (

        <div className = "board row panel panel-default postContain">
        <div className="board row panel-heading">
        <h4 align="left"><Link className="links" to={"/threads/" + data._id}>{data.originalPost.title}</Link></h4><h5>{data.originalPost.date} {data.originalPost.time}</h5>
        </div>
        <div className = "board row panel-body post">
          <div className = "col-md-2">
            <Link to={"/threads/" + data._id}><img src = {data.originalPost.img} width = "100%"/></Link>
          </div>
           <div className = "col-md-10">
        {data.originalPost.description} </div>

        </div>
        <hr/>
        <div className ="col-md-3 reply">
                  <Link to={"/threads/" + data._id}> {data.commentsNo} Replies</Link>
                 </div>
                 <div className="col-md-3 reply">
                  <a href = "#" onClick={(e) => this.handlePinClick(e)}>{pin}</a>
                 </div>
        <div className="col-md-6 result-metadata">
                  {data.originalPost.author.username} -  Posted {unixTimeFromNow(data.originalPost.postDate)}
                 </div>
        </div>

    )
  }
}
/*
<div className = "row panel panel-default postContain">
<div className="row panel-heading">
<h4 align="left">POST TITLE</h4><h5> 2/7/16 at 12:00AM</h5>
</div>
<div className = "row panel-body post">
  <div className = "col-md-2">
    <a href = "#"><img src = "img/ExampleBoard.jpg" width = "100%"></a>
  </div>
   <div className = "col-md-10">
This is where the first few characters of a post would show. Two line max? </div>

</div>
<hr/>
<div className ="col-md-3 reply">
           100 Replies
         </div>
         <div className="col-md-3 reply">
           Pin this Post
         </div>
<div className="col-md-6 result-metadata">
           Username - Sat Feb 6, 2:15 PM
         </div>
</div>

<div className="row">
  <div className="col-sm-6">
    <Link to={"/threads/" + data._id}>{data.originalPost.title}</Link>
  </div>
  <div className="col-sm-6 date-posted">
    Posted {unixTimeFromNow(data.originalPost.postDate)}
  </div>
</div>
<hr />
<p>{data.originalPost.description}</p>
<div className="post-comment-count">
  {data.commentsNo} comments, {data.viewsNo} views
</div>
*/
