import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">

          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <img alt="Brand" src="img/UBoard_logo.png" />
            </a>
          </div>

          <ul className="nav navbar-nav navbar-center">
            <h3 className="navbar-title">
              <a href="#">UBoard</a>
            </h3>
          </ul>

          <form className="navbar-form navbar-right" role="search">

            <div className="btn-group" role="group" aria-label="...">
              <a className="btn btn-default" href="/#/messaging">
                <i className="fa fa-envelope"></i>
              </a>
              <a className="btn btn-default" href="/#/accountsettings">
                <i className="fa fa-cog"></i>
              </a>
              <a className="btn btn-default" href="/#/createthread">
                <i className="fa fa-pencil"></i>
              </a>
            </div>

            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search UBoard Posts" />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button"><a href="/#/search"><i className="fa fa-search"></i></a></button>
              </span>
            </div>

          </form>

        </div>
      </nav>
    )
  }
}
