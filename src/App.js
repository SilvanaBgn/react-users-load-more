import React from 'react';
import Header from './components/Header';
import axios from 'axios';
import UsersList from './components/UsersList';

export default class App extends React.Component {
  state = {
    users: [],
    isLoading: false,
    errorMsg: '',
    page: 0
  };

  componentDidMount() {
    console.log('> componentDidMount');
    this.loadUsers();    
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('> componentDidUpdate');
    if (prevState.page !== this.state.page ) {
      this.loadUsers();
    }
  }

  loadMore = () => {
    console.log('> loadMore function', this);
    this.setState((prevState) => { 
      return {
        page: prevState.page + 1
      };
    });
  }

  loadUsers = () => {
    console.log('> loadUsers function');
    // let newUsers = this.getNewUsers();
    this.setState({ isLoading: true });
    let newUsers = [];
    axios
      .get(`https://randomuser.me/api/?page=${this.state.page}&results=3`)
      .then((response) => {
        console.log('then-begin')
        this.setState({ errorMsg: '' })
        newUsers = response.data.results;
        console.log('then-end', newUsers)
      })
      .catch(() => {
        this.setState({ errorMsg: 'Error while loading data. Try again later.' })
      })
      .finally(() => {
        console.log('users =', this.state.users, 'newUsers =', newUsers);  
        this.setState((prevState) => {
          return {
            isLoading: false,
            users: [...prevState.users, ...newUsers]
          }
        })
      });
  }

  /* getNewUsers = () => {
    let usersArray = [];
    axios
      .get(`https://randomuser.me/api/?page=${this.state.page}&results=3`)
      .then((response) => {
        console.log('then')
        this.setState({ errorMsg: '' })
        usersArray = response.data.results;
        console.log('then', usersArray)
      })
      .catch(() => {
        this.setState({ errorMsg: 'Error while loading data. Try again later.' })
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
      return usersArray;
  } */

  /*fetch('https://randomuser.me/api/?page=0&results=10')
      .then((response) => {
        console.log('Axios users:', response.json());
      })
      .catch((error) => console.log('Error:', error)); */

  render() {
    console.log('> Render function');
    const { users, isLoading, errorMsg } = this.state;

    return (
      <div className="main-section">
        <Header />
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <UsersList users={users} />
        <div className="load-more">
          <button onClick={this.loadMore} className="btn-grad">
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      </div>
    );
  }
}