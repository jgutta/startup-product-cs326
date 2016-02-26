import React from 'react';

export default class PinnedPosts extends React.Component {
  render() {
    return (
      <div className="panel panel-default content-panel">
        <div className="panel-heading">
          <h3 className="panel-title">Pinned Posts React!</h3>
        </div>
        <div className="panel-body">
          <ul className="list-group">
            {React.Children.map(this.props.children, function(child) {
               return (
                 <li className="list-group-item">
                   {child}
                 </li>
               )
             })}
          </ul>
          <nav>
            <ul className="pager">
              <li><a href="#">More...</a></li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
