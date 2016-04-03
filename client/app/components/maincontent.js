import React from 'react';

export default class MainContent extends React.Component {
  render() {
    return (
      <div className="panel panel-default content-panel">
        <div className="panel-body">

          <h3 className="content-title">{this.props.title}</h3>
          <hr className="content-title-separator" />

          {this.props.children}

        </div>
      </div>
    )
  }
}
