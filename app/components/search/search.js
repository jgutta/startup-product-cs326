import React from 'react';
import MainContent from '../maincontent';
import getSearchData from '../../server';

export default class Search extends React.Component {
  constructor(props) {
    // super() calls the parent class constructor -- e.g. React.Component's constructor.
    super(props);
    // Set state's initial value.
    // Note that the constructor is the ONLY place you should EVER set state directly!
    // In all other places, use the `setState` method instead.
    // Setting `state` directly in other places will not trigger `render()` to run, so your
    // program will have bugs.
    this.state = {
      // Empty feed.
      contents: []
    };
  }

  componentDidMount() {

  }


  render() {
    return (
      <MainContent title= "UBoard Search">
          <div className="main-content">
            <div className="main-content-body">
                <div className="input-group search-bar">
                  <input type="text" className="form-control" defaultValue="PARTY" />
                  <span className="input-group-btn">
                        <button type="button" className="btn btn-default dropdown-toggle dropdown" data-toggle="dropdown">
                          All  <span className="caret"></span>
                        </button>
                    <ul className="dropdown-menu">
                      <li><a href="#">All</a></li>
                      <li><a href="#">General</a></li>
                      <li><a href="#">Concerts</a></li>
                      <li><a href="#">Games</a></li>
                      <li><a href="#">Local Events</a></li>
                      <li><a href="#">Music</a></li>
                      <li><a href="#">Notes/Textbooks</a></li>
                      <li><a href="#">RSOs</a></li>
                      <li><a href="#">Sports</a></li>
                      <li><a href="#">Studying</a></li>
                      <li><a href="#">TV/Movies</a></li>
                      <li><a href="#">Videogames</a></li>
                    </ul>
                    <button type="submit" className="btn btn-default submit">
                      <a href="javascript:location.reload(true)"><span className="glyphicon glyphicon-search"></span></a>

                    </button>
                    </span>
                  </div>
                </div>
          </div>
        </MainContent>
    )
  }
}
