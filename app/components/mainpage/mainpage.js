import React from 'react';
import MainContent from '../maincontent';

export default class MainPage extends React.Component {
  render() {
    return (
      <MainContent title="Welcome to UBoard">Main content  <a href='/#/board'>boards</a></MainContent>
    )
  }
}
