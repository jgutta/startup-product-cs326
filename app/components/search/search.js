import React from 'react';
import MainContent from '../maincontent';
import SearchResult from './searchresult';
import {getSearchData} from '../../server';

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
    getSearchData((threads) => {
      // Note: setState does a *shallow merge* of the current state and the new
      // state. If state was currently set to {foo: 3}, and we setState({bar: 5}),
      // state would then be {foo: 3, bar: 5}. This won't be a problem here.
      this.setState(threads);
    });
  }


  render() {
    let { query } = this.props.location.query;

    return (
      <MainContent title= "UBoard Search">
        <p>{query}</p>
        <div className="main-content">
          <div className="main-content-body">
            <div className="bar">
              <div className="input-group search-bar">
                <span className="input-group-btn">
                  <input type="text" className="form-control" placeholder="Search UBoard" />
                  <button className="btn btn-default" type="button"><a href="javascript:location.reload(true)"><i className="fa fa-search"></i></a></button>
                </span>
              </div>
            </div>

            <hr />
            <div className="results">
              {this.state.contents.map((thread) => {
                 return (
                   <SearchResult key={thread._id} data={thread} />
                 );
               })}
            </div>

          </div>
        </div>
        </MainContent>
    )
  }
}
