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
      boards: []
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

    var threadDate = '';

    var threadTitle = this.state.title.trim();
    if(this.state.date!==null)
      threadDate = this.state.date.format("l");
    var threadTime = this.state.time.trim();
    var threadDescription = this.state.description.trim();
    var threadImage = this.state.img.trim();
    var threadBoards = this.state.boards;

    if(threadTitle === "")
      alert("Missing thread title!");
    else if(threadDescription === "")
      alert("Missing thread description!")
      else if(threadBoards.length === 0)
      alert("You need to select at least one board!")
      else if(threadBoards.length >= 5)
      alert("The max limit of boards is 4!")
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
        <p><font className="red" color="red">The feilds marked with an asterix (*) are required</font></p>
        <div className="row create-thread-row">
          <div className="col-md-6">
            <div className="input-box-title">Title<font color="red">*</font></div>
            <input type="text" className="form-control create-thread-input" name="title" value={this.state.title} onChange={(e) => this.handleTitleChange(e)} required></input>
          </div>

          <div className="col-md-3">
            <div className="input-box-title">Date</div>
            <div className="input-group date-input">
              <DatePicker placeholderText={moment().format("l")} todayButton="Today" minDate={moment()} selected={this.state.date} onChange={this.handleDateChange.bind(this)} />
              <span className="input-group-addon">
                <span className="glyphicon glyphicon-calendar"></span>
              </span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="input-box-title">Time</div>
            <div className="input-group time-input">
              <input type='text' className="form-control create-thread-input" placeholder={moment().format('LT')} name="time" value={this.state.time} onChange={(e) => this.handleTimeChange(e)}/>
              <span className="input-group-addon">
                <span className="glyphicon glyphicon-time"></span>
              </span>
            </div>
          </div>
        </div>

        <div className="row create-thread-row">
          <div className="col-md-6">
            <div className="input-box-title">Description<font color="red">*</font></div>
            <textarea className="form-control description-input" rows="5" name="description" value={this.state.description} onChange={(e) => this.handleDescriptionChange(e)} required></textarea>
          </div>

          <div className="col-md-1" />

          <div className="col-md-5">
            <div className="input-box-title">Image</div>
            <img className="image-input" id="output" src={this.state.img} />
            <input type="file" className="browse" accept="image/jpeg, image/png" name="image" value={this.state.img} onChange={(e) => this.handleImageChange(e)} />
          </div>
        </div>

        <div className="row create-thread-row">
          <div className="col-md-12">
            <div className="input-box-title">Boards to post to<font color="red">*</font></div>
            <ul className="checkbox-grid" onChange={(e) => this.handleBoardChange(e)}>
              <li><input type="checkbox" name="board" value="1"/>
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
        
        <hr/>

        <div className="create-thread-center">
          <button type="submit" className="btn btn-primary" onClick={(e) => this.handleNewThread(e)}>Submit</button>
        </div>
      </MainContent>
    )
  }
}
