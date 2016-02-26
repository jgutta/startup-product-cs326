import React from 'react';
import MainContent from './maincontent';

export default class Messaging extends React.Component {
  render() {
    return (
      <MainContent title="Uboard Messaging">
        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-tabs">
              <li role="presentation" className="active"><a href="#" className="tab">
                PIC cinemaloverno7
                <button type="button" className="btn btn-default">
                  <span className="glyphicon glyphicon-remove-sign"></span>
                </button>
              </a></li>
              <li role="presentation"><a href="#" className="tab">
                PIC guitarist78
                <button type="button" className="btn btn-default">
                  <span className="glyphicon glyphicon-remove-sign"></span>
                </button>
              </a></li>
              <li role="presentation"><a href="#" className="tab">
                PIC ilikemonopoly
                <button type="button" className="btn btn-default">
                  <span className="glyphicon glyphicon-remove-sign"></span>
                </button>
              </a></li>
              <li className="dropdown messaging-people-dropdown pull-right">
                <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                  <li><a href="#">PIC pizzzzaparty666</a></li>
                  <li><a href="#">PIC concertrocker\m/</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="panel panel-default message message-outgoing">
          <div className="panel-heading">
            <h3 className="panel-title">Re: The Projectionist</h3>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-12">
                Yeah, Ill definitely be able to bring the movie.
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-12 message-metadata">
                tim.richards - Sat Feb 6, 2:15 PM
              </div>
            </div>
          </div>
        </div>

        <div className="panel panel-default message message-incoming">
          <div className="panel-heading">
            <h3 className="panel-title">Re: The Projectionist</h3>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-12">
                Awesome! I think Ill be bringing a group of ~5 with me.
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-12 message-metadata">
                cinemaloverno7 - Sat Feb 6, 3:47 PM
              </div>
            </div>
          </div>
        </div>

        <div className="panel panel-default message message-incoming">
          <div className="panel-heading">
            <h3 className="panel-title">Re: The Projectionist</h3>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-12">
                Oh, btw, any word on Rene?
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-12 message-metadata">
                cinemaloverno7 - Sat Feb 6, 3:52 PM
              </div>
            </div>
          </div>
        </div>

        <div className="row messaging-text-entry">
          <div className="col-md-12">
            <form>
              <fieldset className="form-group">
                <textarea className="form-control text-entry-title" rows="1">Re: The Projectionist</textarea>
                <textarea className="form-control text-entry-message" placeholder="Write a message..." rows="3"></textarea>
              </fieldset>
              <button type="submit" className="btn btn-primary pull-right">Submit</button>
            </form>
          </div>
        </div>
      </MainContent>
    )
  }
}
