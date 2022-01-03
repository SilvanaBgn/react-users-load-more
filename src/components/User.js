const User = ({ name, location, email, picture }) => {
  return (
    <div className="random-user">
      <div className="user-image">
        <img src={picture.medium} alt={name.first} />
      </div>
      <div className="user-details">
        <div>
          <b>Name:</b> {name.first} {name.last}
        </div>
        <div>
          <b>Country:</b> {location.country}
        </div>
        <div>
          <b>Email:</b> {email}
        </div>
      </div>
    </div>
  );
};

export default User;
