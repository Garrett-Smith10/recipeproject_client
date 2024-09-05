import { useEffect, useState } from "react";
import { fetchProfileInfo } from "../../services/profileService.js";
import './Profile.css'; // Import the CSS file

export const Profile = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfileInfo().then((data) => {
      setProfiles(data); // Assuming data is an array of user profiles
    });
  }, []);

  return (
    <div className="profile-container">
      <div className="title is-3 has-text-centered">User Profile</div>
      <ul className="list is-hoverable">
        {profiles.map((profile, index) => (
          <li key={index} className="list-item box">
            <p>
              <strong>Username:</strong> {profile.username}
            </p>
            <p>
              <strong>First Name:</strong> {profile.first_name}
            </p>
            <p>
              <strong>Last Name:</strong> {profile.last_name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
