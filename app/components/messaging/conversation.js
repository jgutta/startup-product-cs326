import React from 'react';

export default class Conversation extends React.Component {
  render() {
    return (
      <div>
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

      </div>
    )
  }
}
