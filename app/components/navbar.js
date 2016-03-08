import React from 'react';
import { Link } from 'react-router';

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
              <Link to="/">UBoard</Link>
            </h3>
          </ul>

          <form className="navbar-form navbar-right" role="search">

            <div className="btn-group" role="group" aria-label="...">
              <Link className="btn btn-default" to="/messaging/">
                <i className="fa fa-envelope"></i>
              </Link>
              <Link className="btn btn-default" to="/accountsettings/">
                <i className="fa fa-cog"></i>
              </Link>
              <Link className="btn btn-default" to="/createthread/">
                <i className="fa fa-pencil"></i>
              </Link>
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
