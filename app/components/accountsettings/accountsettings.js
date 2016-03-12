import React from 'react';
import MainContent from '../maincontent';
import{getUserData, updateUserData} from '../../server';

export default class AccountSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            gender: '',
            password:'',
            blocked: '',
            email: '',
            emailset: '',
            image: 'img/default_profile_pic.png',
            toggleGender: true,
            toggleEmailSet: true,
            toggleBlocked: true,
            editEmail: false,
            editName: false,
            editPass: false
        };
    }


    componentDidMount(){
        getUserData(this.props.user, (userData) =>{
            this.setState({
                user: userData.user,
                email: userData.user.email,
                username: userData.user.username,
                gender: userData.user.gender,
                password: userData.user.password,
                blocked: userData.user.blocked,
                emailset: userData.user.emailset,
                image: userData.user.image
            });
        });
    }


    handleImageChange(e) {
        e.preventDefault();
        var read = new FileReader();
        read.onload = function(){
            var newImage = document.getElementById('newImage');
            newImage.src = read.result;
        };
        read.readAsDataURL(e.target.files[0]);
        this.setState({ image: e.target.value });
    }

    togglegen(){
         this.setState({toggleGender : !this.state.toggleGender});
    }
    toggleEmSet(){
        this.setState({toggleEmailSet : !this.state.toggleEmailSet});
    }

    handlePassLength(){
        var passStar = '*';
        for(var i = 1; i < this.state.user.password.length; i++){
            passStar = passStar.concat('*');
        }
        return passStar;
    }

    render() {
        if(!this.state.user){
            return <div />
        }

        return (
            <div>
                <MainContent title="Account Settings">
                <div className = "pull-left">
                    <div className = "row">
                        <div className = "col-md-3">
                            <img id = "newImage" src = {this.state.image} width = "100%" />
                            <input type="file" className="pull-left browsePic" accept="image/jpeg, image/png" name="image"  onChange={(e) => this.handleImageChange(e)}></input>
                        </div>
                        <div className = "col-md-8">
                            <span className ="bold">Email:</span>{this.state.user.email}<span className = "pull-right">Change</span>
                            <br />
                            <span className ="bold">Password:</span>
                            <span> {this.handlePassLength()}</span>
                            <span className = "pull-right"> Change</span>
                            <br />
                            <span className = "bold">Display Name: </span>
                            <span>{this.state.user.username}</span><span className = "pull-right"> Change</span>
                            <div className="toggle"></div>
                                <h1>{this.state.toggleGender}</h1>
                                {this.state.toggleGender ?
                                    <div><button onClick={this.togglegen.bind(this)} type = "button" className = "set-btn">
                                        <span className ="glyphicon glyphicon-chevron-down"></span>
                                    </button>
                                    <span className = "bold">Gender: </span>
                                    <div className ="chbx">
                                        <input type="radio" name="gender" value="male"/> Male<br />
                                        <input type="radio" name="gender" value="female"/> Female<br />
                                        <input type="radio" name="gender" value="other"/> Other
                                        </div>
                                    </div>
                                :
                                    <div>
                                        <button  onClick={this.togglegen.bind(this)} type = "button" className = "set-btn">
                                            <span className ="glyphicon glyphicon-chevron-right"></span>
                                        </button>
                                        <span className = "bold">Gender: </span>
                                    </div>

                                }

                                <h1>{this.state.toggleEmailSet}</h1>
                                {this.state.toggleEmailSet ?
                                    <div><button onClick={this.toggleEmSet.bind(this)} type = "button" className = "set-btn">
                                        <span className ="glyphicon glyphicon-chevron-down"></span>
                                    </button>
                                    <span className = "bold"> Email Settings:</span>
                                <div className = "col-md-12 chbx">
                                    <input id = "subscribed" type="checkbox" name="Subscribed" value=""/> Subscribed<br />
                                </div>
                                    </div>
                                :
                                    <div>
                                        <button  onClick={this.toggleEmSet.bind(this)} type = "button" className = "set-btn">
                                            <span className ="glyphicon glyphicon-chevron-right"></span>
                                        </button>
                                        <span className = "bold"> Email Settings:</span>
                                    </div>

                                }
                                <button type = "button" className = "set-btn">
                                    <span className ="glyphicon glyphicon-chevron-down"></span>
                                </button>
                                <span className ="bold"> Blocked: </span>
                                <div className = "col-md-12 ybmove">
                                    <button type = "button" className = "set-btn">
                                        <span className ="glyphicon glyphicon-minus"></span>
                                    </button>{this.state.user.blocked}
                                    <br />

                                    <button type = "button" className = "set-btn pull-left">
                                        <span className ="glyphicon glyphicon-plus"></span>
                                    </button>
                                    <input type="text" name="blocked" /><br />
                                </div>
                                <br />

                                </div>
                            </div>
                        </div>
                        <div className = "row">
                            <div className = "col-md-3 ">
                            </div>
                            <div className = "col-md-9">
                                <button type="button" className ="btn btn-primary pull-right deactivate" >Deactivate</button>
                            </div>
                        </div>
                    </MainContent>
                </div>


        )
    }
}
