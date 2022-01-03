import User from './User';

function UsersList ({users}) {
  return (
    <div className="user-list">
      {
        users && users.map((u) => {
          return <User key={u.login.uuid} {...u} />
        })
      }
    </div>
  )
}

export default UsersList;