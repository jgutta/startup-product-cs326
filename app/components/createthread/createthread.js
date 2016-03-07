import React from 'react';
import MainContent from '../maincontent';

export default class CreateThread extends React.Component {
  render() {
    return (
      <MainContent title="Create Thread">
      <div classNameName="col-md-6">
        <div className="panel panel-default p">
          <div className="panel-body">
            <form role="form">
              <div className="main-content">

                <div className="main-content-body">
                  <span className="red">Fields marked with asterisk (*) are required</span>
                  <div className="panel-body title form-group">
                    <div className="media">
                      <center>Title<font color="red">*</font></center>
                      <div className="media-body">
                        <input type="text" className="form-control" placeholder=""></input>
                      </div>
                    </div>
                  </div>

                  <div className="panel-body date time title form-group">
                    <div className="media">
                      <div className="col-md-6">
                        <center>Date</center>
                        <div className="form-group">
                          <div className="input-group date" id="datetimepicker1">
                            <input type='text' className="form-control" placeholder="e.g. 2/9/16"/>
                            <span className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <center>Time</center>
                        <div className="form-group">
                          <div className="input-group date" id="datetimepicker3">
                            <input type='text' className="form-control" placeholder="e.g. 7:00 PM"/>
                            <span className="input-group-addon">
                        <span className="glyphicon glyphicon-time"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="panel-body description title form-group">
                    <div className="media">
                      <div className="media-top">
                        <center>Description<font color="red">*</font></center>
                      </div>
                      <div className="media-body">
                        <textarea className="form-control" rows="7" placeholder=""></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="panel-body picture form-group">
                    <a><img src="img/default.png" width="30%"/></a>
                    <input type="file" className="browse" accept="image/*"></input>
                  </div>

                  <div className="panel-body checkboxes form-group">
                    <div className="media">
                      <div className="media-top title">
                        <center>What Boards would you like to post this to?<font color="red">*</font></center>
                      </div>
                      <div className="col-md-12 check">
                        <div className="col-md-4">
                          <input type="checkbox" name="board" value="General" defaultchecked/> General
                          <br/>
                          <input type="checkbox" name="board" value="Concerts"/> Concerts
                          <br/>
                          <input type="checkbox" name="board" value="Games"/> Games
                          <br/>
                          <input type="checkbox" name="board" value="Local Events"/> Local Events
                        </div>
                        <div className="col-md-4">
                          <input type="checkbox" name="board" value="Music"/> Music
                          <br/>
                          <input type="checkbox" name="board" value="Notes and Textbooks"/> Notes/Textbooks
                          <br/>
                          <input type="checkbox" name="board" value="RSOs"/> RSOs
                          <br/>
                          <input type="checkbox" name="board" value="Sports"/> Sports
                        </div>
                        <div className="col-md-4">
                          <input type="checkbox" name="board" value="Studying"/> Studying
                          <br/>
                          <input type="checkbox" name="board" value="TV/Movies"/> TV/Movies
                          <br/>
                          <input type="checkbox" name="board" value="Videogames"/> Videogames
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr/>
                  <div className="submit">
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainContent>
    )
  }
}
