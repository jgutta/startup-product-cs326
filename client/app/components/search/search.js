import React from 'react';
import { hashHistory } from 'react-router';
import MainContent from '../maincontent';
import SearchResult from './searchresult';
import { getSearchData } from '../../server';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      value: this.props.location.query.query
    };
  }

  componentDidMount() {
    getSearchData(this.props.location.query.query, (threads) => {
      this.setState(threads);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.location.query.query});
  }

  handleChange(e) {
     e.preventDefault();
     this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.submit();
  }

  handleKeyUp(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      this.submit();
    }
  }

  submit() {
    var queryText = this.state.value.trim();
    if (queryText !== "") {
       hashHistory.push({ pathname: '/search/', query: { query: queryText } });
    }
  }

  render() {
    return (
      <MainContent title= "UBoard Search">
        <div className="main-content">
          <div className="main-content-body">

            <div className="bar">
              <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search UBoard"
                    value={this.state.value} onChange={(e) => this.handleChange(e)}
                    onKeyUp={(e) => this.handleKeyUp(e)} />
                  <span className="input-group-btn">
                  <button className="btn btn-default" onClick={(e) => this.handleSubmit(e)}>
                    <i className="fa fa-search"></i>
                  </button>
                </span>
              </div>
            </div>
            <hr />
            <div className="results"><h4>Search Results for: {this.props.location.query.query}</h4></div>

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
