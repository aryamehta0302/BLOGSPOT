import { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile() {
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || "");

  useEffect(() => {
    if (profilePic) {
      localStorage.setItem("profilePic", profilePic);
    }
  }, [profilePic]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page">
      <h2>Your Profile</h2>
      <div className="profile-card">
        <img
          src={profilePic || "https://via.placeholder.com/150"}
          alt="Profile"
          className="profile-pic"
        />
        <label className="upload-btn">
          Upload Photo
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>
    </div>
  );
}
