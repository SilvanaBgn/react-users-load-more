const User = ({ name, location, email, picture }) => {
  return (
    <li className="random-user">
      <img className="user-image" src={picture.medium} alt={name.first} />
      <div className="user-details">
        <p>
          <b>Name:</b> {name.first} {name.last}
        </p>
        <p>
          <b>Country:</b> {location.country}
        </p>
        <p>
          <b>Email:</b> {email}
        </p>
      </div>
    </li>
  );
};

export default User;
