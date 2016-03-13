import React from 'react';
import MainContent from '../maincontent';
import {getUserData, updateUserData} from '../../server';

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
    this.setState({temp: ''});
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
  handleEmail(e) {
    e.preventDefault();
    this.setState({temp: e.target.value});
    this.updateEmail();
  }

  handleUsername(e) {
    e.preventDefault();
    this.setState({temp: e.target.value});
    this.updateUsername();
  }
  handlePass(e) {
    e.preventDefault();
    this.setState({temp: e.target.value});
    this.updatePass();
  }

  updateEmail() {
    var email = this.state.temp
    if (email !== ""){
      updateUserData(this.props.user, this.state.username, this.state.gender, this.state.password, this.state.blockedUsers, email, this.state.emailset, this.state.image, () => {
        this.getAgain();
      });
    }
    }
  updateUsername() {
    var username = this.state.temp
    if (username !== ""){
      updateUserData(this.props.user, username, this.state.gender, this.state.password, this.state.blockedUsers, this.state.email, this.state.emailset, this.state.image, () => {
        this.getAgain();
      });
    }
    }
  updatePass() {
    var pass = this.state.temp
    if (pass !== ""){
      updateUserData(this.props.user, this.state.username, this.state.gender, pass, this.state.blockedUsers, this.state.email, this.state.emailset, this.state.image, () => {
        this.getAgain();
      });
    }
    }

  handleEmailSet() {
    if (this.state.emailset === 1) {
      this.setState({emailset: 2})
    } else {
      this.setState({emailset: 1})
    }
  this.updateAll();
  }


  handleGen() {
    var gen = this.state.gender
    switch (gen) {
      case(gen === 1):
        document.getElementById('genMale').checked;
        this.setState({gender: 1});
        this.updateAll()
        break;
      case (gen === 2):
      document.getElementById('genFem').checked;
      this.setState({gender: 2});
      this.updateAll()
      break;
      case (gen === 3):
      document.getElementById('genOth').checked;
      this.setState({gender: 3});
      this.updateAll();
      break;

    }
    this.updateAll();
  }

  updateAll(){
    updateUserData(this.props.user, this.state.username, this.state.gender, this.state.password, this.state.blockedUsers, this.state.email, this.state.emailset, this.state.image, () => {
      this.getAgain();
    });
  }

  toggleEmail() {
    this.setState({
      editEmail: !this.state.editEmail
    });
  }

  handleKeyUpEmail(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      this.handleEmail(e);
    }
  }

  handleKeyUpUser(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      this.handleUsername(e);
    }
  }

  handleKeyUpPass(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      this.handlePass(e);
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
                    <span className="bold addgap">Email:
                    </span>
                    <input type="text" name="email" onKeyUp={(e) => this.handleKeyUpEmail(e)}></input>
                    <br/>
                  </div>
                : <div>
                  <i type="button" className="fa fa-pencil-square-o clr" onClick={this.toggleEmail.bind(this)}></i>
                  <span className="bold addgap">Email:</span>{this.state.user.email}
                  <br/>
                </div>
}

              {this.state.editPass
                ? <div>
                    <i type="button" className="fa fa-pencil-square-o clr" onClick={this.togglePass.bind(this)}></i>
                    <span className="bold addgap">Password:</span>
                    <input type="password" name="pwd" onKeyUp={(e) => this.handleKeyUpPass(e)}/>
                    <br/>
                  </div>

                : <div>
                  <i type="button" className="fa fa-pencil-square-o clr" onClick={this.togglePass.bind(this)}></i>
                  <span className="bold addgap">Password:</span>{this.handlePassLength()}
                  <br/>
                </div>
}

              {this.state.editName
                ? <div>
                    <i type="button" className="fa fa-pencil-square-o clr" onClick ={this.toggleUser.bind(this)}></i>
                    <span className="bold">Display Name:
                    </span>
                    <input type="text" name="user" onKeyUp={(e) => this.handleKeyUpUser(e)}></input>
                  </div>
                : <div>
                  <i type="button" className="fa fa-pencil-square-o clr" onClick={this.toggleUser.bind(this)}></i>
                  <span className="bold">Display Name:
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
                      <input type="radio" name="gender" value="1" id="genMale" onClick={(e) => this.handleGen(e)}/>
                      Male<br/>
                      <input type="radio" name="gender" value="2" id="genFem" onClick={(e) => this.handleGen(e)}/>
                      Female<br/>
                      <input type="radio" name="gender" value="3" id="genOth" onClick={(e) => this.handleGen(e)} />
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
                      Email Settings:</span>
                    {(this.state.emailset === 1) ? <div>
                      <div className="col-md-12 chbx">
                        <div><input type="checkbox" name="Subscribed" value="1" defaultChecked="true" onChange={(e) => this.handleEmailSet(e)}/>Subscribed</div>
                      </div>
                    </div>
                      :
                      <div>
                        <div className="col-md-12 chbx">
                          <div><input type="checkbox" name="Subscribed" value="2" defaultChecked = "false" onChange={(e) => this.handleEmailSet(e)}/>Subscribed</div>
                        </div>
                      </div>
                    }
                  </div>
                : <div>
                  <button onClick={this.toggleEmSet.bind(this)} type="button" className="set-btn">
                    <span className="glyphicon glyphicon-chevron-right"></span>
                  </button>
                  <span className="bold">
                    Email Settings:</span>
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
                      <button type="button" className="set-btn">
                        <span className="glyphicon glyphicon-minus"></span>
                      </button>{this.state.user.blockedUsers}<br/>
                      <button type="button" className="set-btn">
                        <span className="glyphicon glyphicon-plus"></span>
                      </button>
                    </div>
                  </div>
                : <div>
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
