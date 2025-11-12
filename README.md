# 📝 BlogSpot - Modern MERN Stack Blog Platform

A full-featured, modern blog platform built with MongoDB, Express.js, React, and Node.js. Features user authentication, profile management with image upload, blog creation, bookmarking, and responsive design with dark/light theme support.

![BlogSpot](https://img.shields.io/badge/BlogSpot-MERN%20Stack-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Node](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-19+-blue)

## ✨ Features

### 🔐 Authentication & User Management

- **Secure Registration/Login** - JWT-based authentication with bcrypt password hashing
- **Profile Management** - Upload profile pictures, edit bio and personal information
- **Gender-based Avatars** - Default avatars based on user gender selection
- **Email Validation** - Requires @gmail.com email addresses

### 📖 Blog Management

- **Create & Publish Blogs** - Rich blog creation with title, cover image, and content
- **View Blog Details** - Full blog reading experience with formatted content
- **Bookmark System** - Save favorite blogs for later reading
- **Author Profiles** - View blog author information and avatars

### 🎨 Modern UI/UX

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme** - Toggle between modern dark and light themes
- **Clean Interface** - Modern card-based design with smooth animations
- **Search Functionality** - Search blogs by title, content, or author

### 🚀 Technical Features

- **Local Image Storage** - Profile images stored locally with multer
- **RESTful API** - Clean, organized backend API structure
- **Real-time Updates** - Immediate UI updates for user actions
- **Error Handling** - Comprehensive error handling and user feedback

## 📁 Project Structure

```
BLOGSPOT/
├── backend/                 # Node.js + Express API Server
│   ├── config/             # Database & upload configuration
│   │   ├── db.js          # MongoDB connection setup
│   │   ├── upload.js      # Multer file upload configuration
│   │   └── default.json   # Database connection strings
│   ├── modules/            # Mongoose data models
│   │   ├── User.js        # User schema with authentication
│   │   └── Blog.js        # Blog post schema
│   ├── Routes/api/         # API route handlers
│   │   ├── users.js       # User authentication & profile routes
│   │   └── blog.js        # Blog CRUD operations
│   ├── uploads/            # Local file storage directory
│   │   └── profiles/       # Profile images storage
│   ├── package.json       # Backend dependencies
│   └── index.js           # Express server entry point
│
├── frontend/               # React + Vite Frontend
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   │   ├── Navbar.jsx # Navigation with theme toggle
│   │   │   ├── BlogCard.jsx # Blog display component
│   │   │   └── Footer.jsx  # Page footer
│   │   ├── pages/         # Main page components
│   │   │   ├── Home.jsx   # Blog listings homepage
│   │   │   ├── Login.jsx  # User login form
│   │   │   ├── Register.jsx # User registration
│   │   │   ├── Profile.jsx  # User profile management
│   │   │   ├── AddBlog.jsx  # Blog creation form
│   │   │   ├── BlogDetails.jsx # Full blog reading
│   │   │   └── Bookmarks.jsx   # Saved blogs
│   │   ├── assets/        # Image assets
│   │   │   ├── unknown_male.jpg   # Default male avatar
│   │   │   ├── unknown_female.jpg # Default female avatar
│   │   │   └── unknown.jpg        # Default neutral avatar
│   │   ├── theme.css      # Comprehensive styling system
│   │   ├── App.jsx        # Main React application
│   │   └── main.jsx       # React application entry point
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
│
├── .gitignore             # Git ignore rules
└── README.md              # Project documentation
```

## 🚀 Quick Start

### Prerequisites

Make sure you have these installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Git** - [Download here](https://git-scm.com/)

### 🔧 Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/BLOGSPOT.git
   cd BLOGSPOT
   ```

2. **Backend Setup**

   ```bash
   # Navigate to backend directory
   cd backend

   # Install dependencies
   npm install

   # Start MongoDB (if running locally)
   # mongod

   # Start the backend server
   npm start
   ```

   The backend server will run on `http://localhost:3000`

3. **Frontend Setup** (Open a new terminal)

   ```bash
   # Navigate to frontend directory (from project root)
   cd frontend

   # Install dependencies
   npm install

   # Start the development server
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

4. **Open Your Browser**
   Visit `http://localhost:5173` to use the BlogSpot application!

## 🔧 Configuration

### Database Configuration

Edit `backend/config/default.json` to configure your MongoDB connection:

```json
{
  "mongoURI": "mongodb://localhost:27017/blogspot"
}
```

For MongoDB Atlas, replace with your connection string:

```json
{
  "mongoURI": "mongodb+srv://username:password@cluster.mongodb.net/blogspot"
}
```

### Environment Variables

Create a `.env` file in the backend directory for production:

```env
JWT_SECRET=your-super-secret-jwt-key-here
MONGODB_URI=your-mongodb-connection-string
NODE_ENV=production
```

## 📱 Usage Guide

### Getting Started

1. **Register** - Create a new account with your @gmail.com email
2. **Login** - Access your account with your credentials
3. **Complete Profile** - Upload a profile picture and add a bio
4. **Create Blogs** - Share your thoughts and ideas
5. **Explore** - Read, bookmark, and upvote other blogs

### Key Features

- **🌙 Theme Toggle** - Switch between dark and light modes
- **🔍 Search** - Find blogs by title, content, or author
- **🔖 Bookmarks** - Save blogs to read later
- **👤 Profile** - Manage your account and view your blogs
- **📝 Blog Creation** - Rich text editor with image support

## 🛠️ Development

### Backend API Endpoints

#### Authentication

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `POST /api/users/upload-profile-image` - Upload profile image (protected)

#### Blogs

- `GET /api/blogs/` - Get all blogs
- `GET /api/blogs/:id` - Get specific blog
- `POST /api/blogs/create` - Create new blog (protected)
- `GET /api/users/my-blogs` - Get current user's blogs (protected)

### Tech Stack Details

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt, Multer
- **Frontend**: React 19, React Router DOM, Axios, Vite
- **Styling**: Custom CSS with CSS Variables for theming
- **Authentication**: JWT tokens with localStorage
- **File Upload**: Multer for local image storage

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB is running locally or check your Atlas connection string
   - Verify the database name in the configuration

2. **Port Already in Use**

   - Backend (3000): `lsof -ti:3000 | xargs kill` (Mac/Linux) or change port in `index.js`
   - Frontend (5173): `lsof -ti:5173 | xargs kill` (Mac/Linux) or change port in `vite.config.js`

3. **CORS Errors**

   - Ensure the backend server is running on port 3000
   - Check that CORS is properly configured in `backend/index.js`

4. **Image Upload Issues**
   - Verify the `uploads/profiles` directory exists
   - Check file permissions for the uploads directory
   - Ensure image files are under 5MB

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature-name'`
4. Push to branch: `git push origin feature-name`
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Contributors

This project was collaboratively developed by:

**Arya Mehta** - Project Leader & Frontend Architect

- GitHub: [@aryamehta0302](https://github.com/aryamehta0302)
- Role: Architecture design, UI/UX design, and frontend implementation

**Deval Shah** - Full-Stack Developer & Integration Specialist

- GitHub: [@Deval2211](https://github.com/Deval2211)
- Role: API connection between frontend and backend, database management, and deployment

**Parth Panara** - Backend Developer

- GitHub: [@parth-panara-1204](https://github.com/parth-panara-1204)
- Role: Express.js server development and API mapping

## 🙏 Acknowledgments

- Built with the MERN stack
- Styled with modern CSS principles
- Inspired by modern blog platforms
- Uses local storage for development simplicity

---

⭐ **Star this repository if you found it helpful!** ⭐
