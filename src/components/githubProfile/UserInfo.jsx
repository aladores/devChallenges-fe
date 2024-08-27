import "./UserInfo.css";

// eslint-disable-next-line react/prop-types
function UserInfo({ avatar_url, followers, following, location, title }) {
  return (
    <div>
      <div className="gh__profile-top-row">
        <img
          src={avatar_url}
          alt="github profile picture"
          className="gh__profile-picture"
        />
        <div className="gh__meta-info-container">
          <div className="gh__meta-info">
            <span className="grey-text gh__meta-info-header">Followers</span>
            <span className="gh__pipe"></span>
            <span className="light-grey-text">{followers}</span>
          </div>
          <div className="gh__meta-info">
            <span className="grey-text">Following</span>
            <span className="gh__pipe"></span>
            <span className="light-grey-text">{following}</span>
          </div>
          <div className="gh__meta-info">
            <span className="grey-text">Location</span>
            <span className="gh__pipe"></span>
            <span className="light-grey-text">{location}</span>
          </div>
        </div>
      </div>
      <h2 className="gh__profile-title">{title}</h2>
    </div>
  );
}

export default UserInfo;
