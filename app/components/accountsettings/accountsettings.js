import React from 'react';
import MainContent from '../maincontent';
import{getUserData} from '../../server';

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
            image: 'img/default_profile_pic.png'
        };
    }

    componentDidMount(){
        getUserData(this.props.user, (userData) =>{
            this.setState({ username: userData.username });
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

    render() {
        console.log(this.state);
        return (
            <div>
                <MainContent title="Account Settings">
                <div className = "pull-left">
                    <div className = "row">
                        <div className = "col-md-3">
                            <img id = "newImage" src = {this.state.image} width = "100%" />
                            <input type="file" className="pull-left browsePic" accept="image/*" name="image" value={this.state.image} onChange={(e) => this.handleImageChange(e)}></input>
                        </div>
                        <div className = "col-md-8">
                            <span className ="bold">Email:</span>{this.state.email}<span className = "pull-right"> Change</span>
                            <br />
                            <span className ="bold">Password:</span>
                            <span> *************</span>
                            <span className = "pull-right"> Change</span>
                            <br />
                            <span className = "bold">Display Name: </span>
                            <span>Tim Richards</span>
                            <br />
                            <button type = "button" className = "set-btn">
                                <span className ="glyphicon glyphicon-chevron-down"></span>
                            </button>
                            <span className = "bold">Gender: </span>
                            <br />
                            <div className ="chbx">
                                <input type="radio" name="gender" value="male"/> Male<br />
                                <input type="radio" name="gender" value="female"/> Female<br />
                                <input type="radio" name="gender" value="other"/> Other
                                    <br />
                                </div>
                                <button type = "button" className = "set-btn">
                                    <span className ="glyphicon glyphicon-chevron-down"></span>
                                </button>
                                <span className = "bold"> Email Settings:</span>
                                <div className = "col-md-12 chbx">
                                    <input type="checkbox" name="Subscribed" value=""/> Subscribed<br />

                                </div>
                                <br />
                                <button type = "button" className = "set-btn">
                                    <span className ="glyphicon glyphicon-chevron-down"></span>
                                </button>
                                <span className ="bold"> Blocked: </span>
                                <div className = "col-md-12 ybmove">
                                    <button type = "button" className = "set-btn">
                                        <span className ="glyphicon glyphicon-minus"></span>
                                    </button> HarryMaybourne
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
                                <button type="button" className ="btn btn-primary pull-right deactivate">Deactivate</button>
                            </div>
                        </div>
                    </MainContent>
                </div>


        )
    }
}
