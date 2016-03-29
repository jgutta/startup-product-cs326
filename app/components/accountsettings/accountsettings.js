import React from 'react';
import MainContent from '../maincontent';
import {getUserData, updateUserData, unBlock, addBlock} from '../../server';

export default class AccountSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      gender: '',
      password: '',
      blockedUsers: '',
      email: '',
      emailset: '',
      image: 'img/default_profile_pic.png',
      toggleGender: true,
      toggleEmailSet: true,
      toggleBlocked: true,
      editEmail: false,
      editName: false,
      editPass: false,
      addBlock: false,
      tempBlock: '',
      temp: ''
    };
  }

  getAgain() {
    getUserData(this.props.user, (userData) => {
      this.setState({
        user: userData.user,
        email: userData.user.email,
        username: userData.user.username,
        gender: userData.user.gender,
        password: userData.user.password,
        emailset: userData.user.emailset,
        image: userData.user.image,
        blockedUsers: userData.user.blockedUsers
      });
    });
    this.setState({editEmail: false});
    this.setState({editName: false});
    this.setState({editPass: false});
  }

  componentDidMount() {
    this.getAgain();
  }

  handleImageChange(e) {
    e.preventDefault();
    var read = new FileReader();
    read.onload = function() {
      var newImage = document.getElementById('newImage');
      newImage.src = read.result;
    };
    read.readAsDataURL(e.target.files[0]);
    this.setState({image: e.target.value});

  }

  togglegen() {
    this.setState({
      toggleGender: !this.state.toggleGender
    });
  }
  toggleEmSet() {
    this.setState({
      toggleEmailSet: !this.state.toggleEmailSet
    });
  }

  toggleBlock() {
    this.setState({
      toggleBlocked: !this.state.toggleBlocked
    });
  }

  handlePassLength() {
    var passStar = '*';
    for (var i = 1; i < this.state.user.password.length; i++) {
      passStar = passStar.concat('*');
    }
    return passStar;
  }

  handleDeactivate(e) {
    e.preventDefault();
    updateUserData(this.props.user, 'deleted', this.state.gender, 'deleted', this.state.blockedUsers, 'deleted', 2, 'img/default_profile_pic.png', () => {
      this.getAgain();
    });

  }

  handleEmailSet() {
    if (this.state.emailset === 1) {
      updateUserData(this.props.user, this.state.username, this.state.gender, this.state.password, this.state.blockedUsers, this.state.email, 2, this.state.image, () => {
        this.getAgain();
      });
    } else {
      updateUserData(this.props.user, this.state.username, this.state.gender, this.state.password, this.state.blockedUsers, this.state.email, 1, this.state.image, () => {
        this.getAgain();
      });
    }
  }

  handleGen1() {
      updateUserData(this.props.user, this.state.username, 1, this.state.password, this.state.blockedUsers, this.state.email, this.state.emailset, this.state.image, () => {
        this.getAgain();
      });
  }

  handleGen2() {
      updateUserData(this.props.user, this.state.username, 2, this.state.password, this.state.blockedUsers, this.state.email, this.state.emailset, this.state.image, () => {
        this.getAgain();
      });
  }
  handleGen3() {
      updateUserData(this.props.user, this.state.username, 3, this.state.password, this.state.blockedUsers, this.state.email, this.state.emailset, this.state.image, () => {
        this.getAgain();
      });
  }



  updateAll() {
    updateUserData(this.props.user, this.state.username, this.state.gender, this.state.password, this.state.blockedUsers, this.state.email, this.state.emailset, this.state.image, () => {
      this.getAgain();
    });
  }

  toggleEmail() {
    this.setState({
      editEmail: !this.state.editEmail
    });
  }
  handleEmail(e) {
    this.setState({email: e.target.value});
  }

  handleKeyUpEmail(e) {
    if (e.key === 'Enter') {
      var email = this.state.email.trim();
      if (email !== "") {
        updateUserData(this.props.user, this.state.username, this.state.gender, this.state.password, this.state.blockedUsers, email, this.state.emailset, this.state.image, () => {
          this.getAgain();
        });
      }
    }
  }
  handleUser(e) {
    this.setState({username: e.target.value});
  }
  handleKeyUpUser(e) {
    if (e.key === 'Enter') {
      var username = this.state.username.trim();
      if (username !== "") {
        updateUserData(this.props.user, username, this.state.gender, this.state.password, this.state.blockedUsers, this.state.email, this.state.emailset, this.state.image, () => {
          this.getAgain();
        });
      }
    }
  }
  handlePass(e) {
    this.setState({password: e.target.value});
  }

  handleKeyUpPass(e) {
    if (e.key === 'Enter') {
      var pass = this.state.password.trim();
      if (pass !== "") {
        updateUserData(this.props.user, this.state.username, this.state.gender, pass, this.state.blockedUsers, this.state.email, this.state.emailset, this.state.image, () => {
          this.getAgain();
        });
      }
    }
  }
  toggleUser() {
    this.setState({
      editName: !this.state.editName
    });
  }
  togglePass() {
    this.setState({
      editPass: !this.state.editPass
    });
  }
  remove(e, blocked) {
    e.preventDefault();
    unBlock(this.props.user, blocked, () => {
      this.getAgain();
    });
  }
  add(e) {
    if (e.key === 'Enter') {
      if(this.state.tempBlock !== ""){
      addBlock(this.props.user, this.state.tempBlock, () => {
        this.getAgain();

      });
    }
  }
  }
  handleBlockUser(e){
    this.setState({tempBlock: e.target.value.trim()});
  }

  toggleBlockUser(){
    this.setState({
      addBlock: !this.state.addBlock
    });
  }


  render() {
    if (!this.state.user) {
      return <div/>
    }
    return (
      <MainContent title="Account Settings">
        <div className="pull-left">
          <div className="row">
            <div className="col-md-3">
              <img id="newImage" src={this.state.image} width="100%"/>
              <input type="file" className="pull-left browsePic" accept="image/jpeg, image/png" name="image" onChange={(e) => this.handleImageChange(e)}></input>
            </div>
            <div className="col-md-8">
              {this.state.editEmail
                ? <div>
                    <i type="button" className="fa fa-pencil-square-o clr" onClick={this.toggleEmail.bind(this)}></i>
                    <span className="bold addgap marg">Email:
                    </span>
                    <input type="email" name="email" onChange= {(e) => this.handleEmail(e)} onKeyUp={(e) => this.handleKeyUpEmail(e)}></input>
                    <br/>
                  </div>
                : <div>
                  <i type="button" className="fa fa-pencil-square-o clr" onClick={this.toggleEmail.bind(this)}></i>
                  <span className="bold addgap marg">Email:</span>{this.state.user.email}
                  <br/>
                </div>
}

              {this.state.editPass
                ? <div>
                    <i type="button" className="fa fa-pencil-square-o clr" onClick={this.togglePass.bind(this)}></i>
                    <span className="bold addgap marg">Password:</span>
                    <input type="password" name="pwd" onChange= {(e) => this.handlePass(e)} onKeyUp={(e) => this.handleKeyUpPass(e)}/>
                    <br/>
                  </div>

                : <div>
                  <i type="button" className="fa fa-pencil-square-o clr" onClick={this.togglePass.bind(this)}></i>
                  <span className="bold addgap marg">Password:</span>{this.handlePassLength()}
                  <br/>
                </div>
}

              {this.state.editName
                ? <div>
                    <i type="button" className="fa fa-pencil-square-o clr" onClick ={this.toggleUser.bind(this)}></i>
                    <span className="bold marg">Display Name:
                    </span>
                    <input type="text" name="user" onChange= {(e) => this.handleUser(e)} onKeyUp={(e) => this.handleKeyUpUser(e)}></input>
                  </div>
                : <div>
                  <i type="button" className="fa fa-pencil-square-o clr" onClick={this.toggleUser.bind(this)}></i>
                  <span className="bold marg">Display Name:
                  </span>{this.state.user.username}
                </div>
}
              <div className="toggle"></div>
              <h1>{this.state.toggleGender}</h1>
              {this.state.toggleGender
                ? <div>
                    <button onClick={this.togglegen.bind(this)} type="button" className="set-btn">
                      <span className="glyphicon glyphicon-chevron-down"></span>
                    </button>
                    <span className="bold">Gender:
                    </span>
                    <div className="chbx">
                      {this.handleGen}
                      <input type="radio" name="gender" value="1" id="genMale" checked = {this.state.gender == 1
                    ? "checked"
                    : ""} onChange={(e) => this.handleGen1(e)}/>
                      Male<br/>
                    <input type="radio" name="gender" value="2" id="genFem" checked = {this.state.gender == 2
                    ? "checked"
                    : ""} onChange={(e) => this.handleGen2(e)}/>
                      Female<br/>
                    <input type="radio" name="gender" value="3" id="genOth" checked = {this.state.gender == 3
                    ? "checked"
                    : ""} onChange={(e) => this.handleGen3(e)}/>
                      Other
                    </div>
                  </div>
                : <div>
                  <button onClick={this.togglegen.bind(this)} type="button" className="set-btn">
                    <span className="glyphicon glyphicon-chevron-right"></span>
                  </button>
                  <span className="bold">Gender:
                  </span>
                </div>
}
              <h1>{this.state.toggleEmailSet}</h1>
              {this.state.toggleEmailSet
                ? <div>
                    <button onClick={this.toggleEmSet.bind(this)} type="button" className="set-btn">
                      <span className="glyphicon glyphicon-chevron-down"></span>
                    </button>
                    <span className="bold">
                      Email Settings:</span><br/>
                    <div className="col-md-12 chbx">
                      <div><input type="checkbox" name="Subscribed" value="1" id="subscribed" checked={this.state.emailset == 1
                    ? true
                    : false} onChange={(e) => this.handleEmailSet(e)}/>Subscribed</div><br/>
                    </div>
                  </div>
                : <div>
                  <button onClick={this.toggleEmSet.bind(this)} type="button" className="set-btn">
                    <span className="glyphicon glyphicon-chevron-right"></span>
                  </button>
                  <span className="bold">
                    Email Settings:</span><br/>
                </div>
}

              <div className="toggle"></div>
              <h1>{this.state.toggleBlocked}</h1>
              {this.state.toggleBlocked
                ? <div>
                  <button onClick={this.toggleBlock.bind(this)} type="button" className="set-btn">
                    <span className="glyphicon glyphicon-chevron-down"></span>
                  </button>
                  <span className="bold">Blocked:
                  </span>
                  <div className="col-md-12 ybmove">
                  </div>
                      {this.state.blockedUsers.map((user) => {
                        return (
                          <div key = {user._id}>
                          <button type="button" className="set-btn">
                            <span className="glyphicon glyphicon-minus" onClick={(e) => this.remove(e, user._id)}></span>
                          </button>
                          {user.username} < br />
                          </div>
                        );
                      })}
                    </div>
                  :
                  <div>
                    <button onClick={this.toggleBlock.bind(this)} type="button" className="set-btn">
                      <span className="glyphicon glyphicon-chevron-right"></span>
                    </button>
                    <span className="bold">
                      Blocked:
                    </span>
                  </div>
                }

            </div>
            <div className="row">
              <div className="col-md-3 "></div>
              <div className="col-md-9">
                <button onClick={(e) => this.handleDeactivate(e)} type="button" className="btn btn-primary pull-right deactivate">Deactivate</button>
              </div>
            </div>
          </div>
        </div>
      </MainContent>
    )
  }
}
