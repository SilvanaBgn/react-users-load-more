import User from './User';

function UsersList ({users}) {
  return (
    <ul className="user-list">
      {
        users && users.map((u) => {
          return <User key={u.login.uuid} {...u} />
        })
      }
    </ul>
  )
}

export default UsersList;