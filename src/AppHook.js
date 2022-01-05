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
    function loadUsers () {
      // let newUsers = this.getNewUsers();
      setLoadingBool(true);
      let newUsers = [];
      axios
        .get(`https://randomuser.me/api/?page=${page}&results=3`)
        .then((response) => {
          setErrorMsg('')
          newUsers = response.data.results;
          console.log('[AppHook] axios then-end', newUsers)
        })
        .catch(() => {
          setErrorMsg('[AppHook] Error while loading data. Try again later.')
        })
        .finally(() => {
          console.log('[AppHook] users =', users, 'newUsers =', newUsers);
          setLoadingBool(false);
          setUsers([...users, ...newUsers]);
        });
    }
    loadUsers();
  }, [page]);

  function loadMore() {
    setPage(page + 1);
  }

  return (
    <aside>
      <Subheader title = 'With Hooks-cycle'/>
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