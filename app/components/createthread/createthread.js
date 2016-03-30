import React from 'react';
import MainContent from '../maincontent';
import { createThread } from '../../server';
import { hashHistory } from 'react-router';
import moment from 'moment';
import DatePicker from 'react-datepicker';

export default class CreateThread extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      date: null,
      time: '',
      description: '',
      img: 'img/default.png',
      boards: ["1"]
    };
  }

  handleTitleChange(e) {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  handleDateChange(d) {
    this.setState({ date: d });
  }

  handleTimeChange(e) {
    e.preventDefault();
    this.setState({ time: e.target.value });
  }

  handleDescriptionChange(e) {
    e.preventDefault();
    this.setState({ description: e.target.value });
  }

  handleImageChange(e) {
    e.preventDefault();
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('output');
      output.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    this.setState({ img: e.target.value });
  }

  handleBoardChange(e) {
    var index = this.state.boards.indexOf(e.target.value);
    if (index > -1){
      this.state.boards.splice(index, 1);
      this.setState({ boards: this.state.boards})
    }
    else{
      var arrayvar = this.state.boards.slice()
      arrayvar.push(e.target.value)
      this.setState({ boards: arrayvar })
    }
  }

  handleNewThread(e) {
    e.preventDefault();

    var threadTitle = this.state.title.trim();
    if(this.state.date!==null)
      var threadDate = this.state.date.format("l");
    else
      var threadDate = ''
    var threadTime = this.state.time.trim();
    var threadDescription = this.state.description.trim();
    var threadImage = this.state.img.trim();
    var threadBoards = this.state.boards;

    if(threadTitle === "" || threadDescription === "" || threadBoards.length === 0){
      alert("Something required is empty!");
    }
    else if(threadBoards.length >= 5){
      alert("The max limit of boards is 4!")
    }
    else{
      createThread(this.props.user, threadTitle, threadDate, threadTime, threadDescription, threadImage, threadBoards, (thread) => {
          scrollTo(0,0);
          hashHistory.push({ pathname: '/threads/' + thread._id});
      });
    }
  }

  render() {
    return (
      <MainContent title="Create Thread">
        <div classNameName="col-md-6">
          <div className="panel panel-default p">
            <div className="panel-body">
              <form>
                <div className="main-content">

                  <div className="main-content-body">
                    <span className="red">Fields marked with asterisk (*) are required</span>
                    <div className="panel-body title form-group">
                      <div className="media">
                        <center>Title<font color="red">*</font>
                        </center>
                        <div className="media-body">
                          <input type="text" className="form-control p" placeholder="" name="title" value={this.state.title} onChange={(e) => this.handleTitleChange(e)} required></input>
                        </div>
                      </div>
                    </div>

                    <div className="panel-body date time title form-group">
                      <div className="media">
                        <div className="col-md-6">
                          <center>Date</center>
                          <div className="form-group">
                            <center>
                            <DatePicker placeholderText={moment().format("l")} minDate={moment()} selected={this.state.date} onChange={this.handleDateChange.bind(this)} />
                            </center>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <center>Time</center>
                          <div className="form-group">
                            <div className="input-group date" id="datetimepicker3">
                              <input type='text' className="form-control p" placeholder={moment().format('LT')} name="time" value={this.state.time} onChange={(e) => this.handleTimeChange(e)}/>
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
                          <textarea className="form-control p" rows="7" placeholder="" name="description" value={this.state.description} onChange={(e) => this.handleDescriptionChange(e)} required></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="panel-body picture form-group">
                      <a><img id="output" src={this.state.img} width="30%"/></a>
                      <input type="file" className="browse" accept="image/jpeg, image/png" name="image" value={this.state.img} onChange={(e) => this.handleImageChange(e)}></input>
                    </div>

                    <div className="panel-body checkboxes form-group box">
                      <div className="media">
                        <div className="media-top title">
                          <center>What Boards would you like to post this to?<font color="red">*</font>
                          </center>
                        </div>
                        <ul className="checkbox-grid" onChange={(e) => this.handleBoardChange(e)}>
                          <li><input type="checkbox" name="board" value="1" defaultChecked/>
                            General</li>
                          <li><input type="checkbox" name="board" value="2"/>
                            Concerts</li>
                          <li><input type="checkbox" name="board" value="3"/>
                            Games</li>
                          <li><input type="checkbox" name="board" value="4"/>
                            Local Events</li>
                          <li><input type="checkbox" name="board" value="5"/>
                            Music</li>
                          <li><input type="checkbox" name="board" value="6"/>
                            Notes/Textbooks</li>
                          <li><input type="checkbox" name="board" value="7"/>
                            RSOs</li>
                          <li><input type="checkbox" name="board" value="8"/>
                            Sports</li>
                          <li><input type="checkbox" name="board" value="9"/>
                            Studying</li>
                          <li><input type="checkbox" name="board" value="10"/>
                            TV/Movies</li>
                          <li><input type="checkbox" name="board" value="11"/>
                            Videogames</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <hr/>
                  <div className="submit">
                    <button type="submit" className="btn btn-primary" onClick={(e) => this.handleNewThread(e)}>Submit</button>
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
