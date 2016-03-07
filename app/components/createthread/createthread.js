import React from 'react';
import MainContent from '../maincontent';

export default class CreateThread extends React.Component {
  render() {
    return (
      <MainContent title="Create Thread">
        <div classNameName="col-md-6">
          <div className="panel panel-default p">
            <div className="panel-body">
              <form role="form" action="thread.php" method="get">
                <div className="main-content">

                  <div className="main-content-body">
                    <span className="red">Fields marked with asterisk (*) are required</span>
                    <div className="panel-body title form-group">
                      <div className="media">
                        <center>Title<font color="red">*</font>
                        </center>
                        <div className="media-body">
                          <input type="text" className="form-control p" placeholder="" name="title" required></input>
                        </div>
                      </div>
                    </div>

                    <div className="panel-body date time title form-group">
                      <div className="media">
                        <div className="col-md-6">
                          <center>Date</center>
                          <div className="form-group">
                            <div className="input-group date" id="datetimepicker1">
                              <input type='text' className="form-control p" placeholder="e.g. 2/9/16" name="date"/>
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
                              <input type='text' className="form-control p" placeholder="e.g. 7:00 PM" name="time"/>
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
                          <center>Description<font color="red">*</font>
                          </center>
                        </div>
                        <div className="media-body">
                          <textarea className="form-control p" rows="7" placeholder="" name="description" required></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="panel-body picture form-group">
                      <a><img src="img/default.png" width="30%"/></a>
                      <input type="file" className="browse" accept="image/*" name="image"></input>
                    </div>

                    <div className="panel-body checkboxes form-group box">
                      <div className="media">
                        <div className="media-top title">
                          <center>What Boards would you like to post this to?<font color="red">*</font>
                          </center>
                        </div>
                        <ul className="checkbox-grid">
                          <li><input type="checkbox" name="board" value="General" defaultChecked/>
                            General</li>
                          <li><input type="checkbox" name="board" value="Concerts"/>
                            Concerts</li>
                          <li><input type="checkbox" name="board" value="Games"/>
                            Games</li>
                          <li><input type="checkbox" name="board" value="Local Events"/>
                            Local Events</li>
                          <li><input type="checkbox" name="board" value="Music"/>
                            Music</li>
                          <li><input type="checkbox" name="board" value="Notes and Textbooks"/>
                            Notes/Textbooks</li>
                          <li><input type="checkbox" name="board" value="RSOs"/>
                            RSOs</li>
                          <li><input type="checkbox" name="board" value="Sports"/>
                            Sports</li>
                          <li><input type="checkbox" name="board" value="Studying"/>
                            Studying</li>
                          <li><input type="checkbox" name="board" value="TV/Movies"/>
                            TV/Movies</li>
                          <li><input type="checkbox" name="board" value="Videogames"/>
                            Videogames</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <hr/>
                  <div className="submit">
                    <button type="submit" className="btn btn-primary">Submit</button>
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
