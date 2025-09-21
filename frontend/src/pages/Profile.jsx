import { useState, useEffect } from "react";
import "./Profile.css";
import unknown from "../assets/unknown.jpg";
import unknownMale from "../assets/unknown_male.jpg";
import unknownFemale from "../assets/unknown_female.jpg";

export default function Profile() {
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || "");
  const [gender, setGender] = useState(localStorage.getItem("gender") || "");
  const [isRegistered, setIsRegistered] = useState(localStorage.getItem("isRegistered") === "true");

  useEffect(() => {
    if (profilePic) {
      localStorage.setItem("profilePic", profilePic);
    }
  }, [profilePic]);

  // Optionally, update gender and registration status from backend or context

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Decide which default image to show
  let defaultImg = unknown;
  if (isRegistered) {
    if (gender === "male") defaultImg = unknownMale;
    else if (gender === "female") defaultImg = unknownFemale;
  }

  return (
    <div className="profile-page">
      <h2>Your Profile</h2>
      <div className="profile-card">
        <img
          src={profilePic || defaultImg}
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
