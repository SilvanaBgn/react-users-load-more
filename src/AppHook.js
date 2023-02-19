import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Subheader from './components/Subheader';
import UsersList from './components/UsersList';

export default function AppHook() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoadingBool] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [page, setPage] = useState(0);

  useEffect(() => {
    console.log('[AppHook] > loadUsers useEffect()');

    async function getNewUsers() {
      console.log('[AppHook] > getNewUsers function');
      let newUsers = await axios
        .get(`https://randomuser.me/api/?page=${page}&results=3`)
        .then((response) => {
          setErrorMsg('')
          return response.data.results;
        })
        .catch(() => {
          setErrorMsg('[AppHook] Error while loading data. Try again later.')
          return [];
        })
      return newUsers;
    }

    setLoadingBool(true);
    getNewUsers()
      .then((newUsers)=>{
        console.log('[AppHook] > getNewUsers - then');
        setUsers((prevUsers) => [...prevUsers, ...newUsers]); // param instead of state, to avoid warning with useEffect() []
        setLoadingBool(false);
      })
  }, [page]);

  const loadMore = () => {
    setPage(page + 1);
  }

  return (
    <aside>
      <Subheader title = 'With Hooks-cycle' />
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <UsersList users={users} />
      <div className="load-more">
        <button onClick={loadMore} className="btn-grad">
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </aside>
  );
}