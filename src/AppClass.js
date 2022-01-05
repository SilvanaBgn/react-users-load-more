import React from 'react';
import axios from 'axios';
import Subheader from './components/Subheader';
import UsersList from './components/UsersList';

export default class AppClass extends React.Component {
  state = {
    users: [],
    isLoading: false,
    errorMsg: '',
    page: 0
  };

  componentDidMount() {
    console.log('[AppClass] > componentDidMount');
    this.loadUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('[AppClass] > componentDidUpdate');
    if (prevState.page !== this.state.page ) {
      this.loadUsers();
    }
  }

  loadMore = () => {
    console.log('[AppClass] > loadMore function', this);
    this.setState((prevState) => {
      return {
        page: prevState.page + 1
      };
    });
  }

  loadUsers = () => {
    console.log('[AppClass] > loadUsers function');
    // let newUsers = this.getNewUsers();
    this.setState({ isLoading: true });
    let newUsers = [];
    axios
      .get(`https://randomuser.me/api/?page=${this.state.page}&results=3`)
      .then((response) => {
        this.setState({ errorMsg: '' })
        newUsers = response.data.results;
        console.log('[AppClass] then-end', newUsers)
      })
      .catch(() => {
        this.setState({ errorMsg: 'Error while loading data. Try again later.' })
      })
      .finally(() => {
        console.log('[AppClass] users =', this.state.users, 'newUsers =', newUsers);
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
    console.log('[AppClass] > Render function');
    const { users, isLoading, errorMsg } = this.state;

    return (
      <aside>
        <Subheader title = 'With Class-cycle'/>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <UsersList users={users} />
        <div className="load-more">
          <button onClick={this.loadMore} className="btn-grad">
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      </aside>

    );
  }
}