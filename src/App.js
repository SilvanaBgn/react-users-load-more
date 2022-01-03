import React from 'react';
import Header from './components/Header';
import axios from 'axios';
import UsersList from './components/UsersList';

export default class App extends React.Component {
  state = {
    users: [],
    isLoading: false,
    errorMsg: ''
  };

  componentDidMount() {
    console.log('1');
    this.setState({ isLoading: true });

    axios
      .get('https://randomuser.me/api/?page=0&results=10')
      .then((response) => {
        console.log('2');
        this.setState({ users: response.data.results, errorMsg: '' });
      })
      .catch(() =>
        this.setState({
          errorMsg: 'Error while loading data. Try again later.'
        })
      )
      .finally(() => {
        console.log('3');
        this.setState({ isLoading: false });
      });

    /*fetch('https://randomuser.me/api/?page=0&results=10')
      .then((response) => {
        console.log('Axios users:', response.json());
      })
      .catch((error) => console.log('Error:', error)); */
  }

  render() {
    console.log('0');
    const { users, isLoading, errorMsg } = this.state;
    console.log('Rendering:', users);

    return (
      <div className="main-section">
        <Header />
        {isLoading && <p className="loading">Loading...</p>}
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <UsersList users={this.state.users} />
      </div>
    );
  }
}