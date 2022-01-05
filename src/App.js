import React from 'react';
import Header from './components/Header';
import AppClass from './AppClass';
import AppHook from './AppHook';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
          <Header />
        <div className="main-section">
          <AppClass />
          <AppHook />
        </div>
      </React.Fragment>
    );
  }
}