import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import unknownMale from "../assets/unknown_male.jpg";
import unknownFemale from "../assets/unknown_female.jpg";
import unknown from "../assets/unknown.jpg";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uploading, setUploading] = useState(false);
  const [userBlogs, setUserBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
    fetchUserBlogs();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const res = await axios.get('http://localhost:3000/api/users/profile', config);
      setUser(res.data);
      setName(res.data.name);
      setBio(res.data.bio || '');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        setMessage('Failed to load profile');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const res = await axios.get('http://localhost:3000/api/users/my-blogs', config);
      setUserBlogs(res.data);
    } catch (err) {
      console.error('Error fetching user blogs:', err);
    } finally {
      setBlogsLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Image size should be less than 5MB');
        return;
      }
      
      // Automatically upload the selected image
      setUploading(true);
      setMessage('');

      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('profileImage', file);

        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        };

        const res = await axios.post(
          'http://localhost:3000/api/users/upload-profile-image',
          formData,
          config
        );

        setUser(res.data.user);
        setMessage('Profile image updated successfully!');
        
        // Update localStorage
        const currentUser = JSON.parse(localStorage.getItem('user'));
        currentUser.profileImage = res.data.user.profileImage;
        localStorage.setItem('user', JSON.stringify(currentUser));

      } catch (err) {
        console.error(err);
        const errorMessage = err.response?.data?.message || 'Failed to upload image';
        setMessage(errorMessage);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const res = await axios.put(
        'http://localhost:3000/api/users/profile',
        { name, bio },
        config
      );

      setUser(res.data.user);
      setEditing(false);
      setMessage('Profile updated successfully!');
      
      // Update localStorage
      const currentUser = JSON.parse(localStorage.getItem('user'));
      currentUser.name = res.data.user.name;
      localStorage.setItem('user', JSON.stringify(currentUser));

    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || 'Failed to update profile';
      setMessage(errorMessage);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  const getGenderEmoji = (gender) => {
    return gender === 'female' ? '👩' : '👨';
  };

  const getDefaultProfileImage = (gender) => {
    if (gender === 'female') return unknownFemale;
    if (gender === 'male') return unknownMale;
    return unknown;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container">
        <div className="card">
          <h2>Access Denied</h2>
          <p>Please login to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container profile-page">
      {/* Profile Header */}
      <div className="card profile-header">
        <div className="profile-info">
          <div className="profile-avatar-section">
            <img 
              src={
                user.profileImage 
                  ? `http://localhost:3000${user.profileImage}` 
                  : getDefaultProfileImage(user.gender)
              } 
              alt={user.name} 
              className="profile-avatar-large"
            />
            
            <div className="profile-upload">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="profile-image-input"
                disabled={uploading}
              />
              <label htmlFor="profile-image-input" className={`btn btn-sm btn-accent ${uploading ? 'disabled' : ''}`}>
                {uploading ? '📤 Uploading...' : '📷 Change Photo'}
              </label>
            </div>
          </div>

          <div className="profile-details">
            {!editing ? (
              <>
                <h1 className="profile-name">{user.name}</h1>
                <p className="profile-email">{user.email}</p>
                <p className="profile-bio">{user.bio || 'No bio added yet.'}</p>
                <p className="profile-meta">
                  {getGenderEmoji(user.gender)} {user.gender} • Joined {formatDate(user.createdAt)}
                </p>
                <button 
                  onClick={() => setEditing(true)} 
                  className="btn btn-primary btn-sm"
                >
                  ✏️ Edit Profile
                </button>
              </>
            ) : (
              <form onSubmit={handleProfileUpdate} className="edit-profile-form">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
                <textarea 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows="3"
                ></textarea>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary btn-sm">
                    💾 Save Changes
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setEditing(false)} 
                    className="btn btn-secondary btn-sm"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="profile-actions">
          <button onClick={handleLogout} className="btn btn-danger btn-sm">
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Messages */}
      {message && (
        <div className={`auth-message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      {/* User's Blogs */}
      <div className="card user-blogs">
        <h2>📝 My Blog Posts ({userBlogs.length})</h2>
        
        {blogsLoading ? (
          <p>Loading your blogs...</p>
        ) : userBlogs.length === 0 ? (
          <div className="no-blogs">
            <p>You haven't written any blog posts yet.</p>
            <button 
              onClick={() => navigate('/add-blog')} 
              className="btn btn-accent"
            >
              ✍️ Write Your First Blog
            </button>
          </div>
        ) : (
          <div className="user-blogs-grid">
            {userBlogs.map(blog => (
              <div key={blog._id} className="mini-blog-card">
                {blog.titleImage && (
                  <img src={blog.titleImage} alt={blog.title} className="mini-blog-image" />
                )}
                <div className="mini-blog-content">
                  <h3>{blog.title}</h3>
                  <p>{blog.subtitle || blog.body.substring(0, 100)}...</p>
                  <p className="mini-blog-date">{formatDate(blog.date)}</p>
                  <button 
                    onClick={() => navigate(`/blog-details/${blog._id}`)}
                    className="btn btn-primary btn-sm"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
