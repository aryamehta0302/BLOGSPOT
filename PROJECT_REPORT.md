# Mini-Project

## Aim

To develop a full-featured, modern blog platform using the MERN Stack (MongoDB, Express.js, React.js, Node.js) that enables users to create, publish, and manage blog posts with secure authentication, profile management, and an interactive user interface.

---

## BlogSpot - Modern MERN Stack Blog Platform

---

## Introduction

BlogSpot is a comprehensive web-based blogging platform that provides users with a complete blogging experience. The application allows users to register accounts, create and publish blog posts, bookmark favorite content, and manage their profiles with custom avatars. Built using the MERN stack, the platform emphasizes security, responsiveness, and user experience.

The platform features JWT-based authentication with bcrypt password hashing, local image storage for profile pictures, a modern dark/light theme toggle, and a fully responsive design that works seamlessly across desktop, tablet, and mobile devices.

### Key Highlights

- **Secure Authentication:** JWT-based authentication with bcrypt password hashing
- **Blog Management:** Create, publish, view, and bookmark blog posts
- **Profile Management:** Upload profile pictures, edit bio and personal information
- **Interactive UI:** Modern card-based design with smooth animations
- **Theme System:** Dark and light mode toggle with persistent preferences
- **Responsive Design:** Mobile-first approach working on all devices
- **Search Functionality:** Real-time search by title, content, or author

### Technology Stack

**Frontend:**

- React 19.1.1 - Core UI framework
- React Router DOM 7.8.2 - Client-side routing
- Axios 1.12.2 - HTTP client for API requests
- Vite 7.1.2 - Build tool and development server
- Custom CSS with CSS Variables - Styling system

**Backend:**

- Node.js 18+ - Runtime environment
- Express.js 5.1.0 - Web framework
- MongoDB with Mongoose 8.18.1 - Database
- JWT (jsonwebtoken 9.0.2) - Authentication tokens
- Bcrypt 6.0.0 - Password hashing
- Multer 2.0.2 - File upload handling
- CORS 2.8.5 - Cross-origin resource sharing

### Team Members

**Arya Mehta** - Project Leader & Frontend Architect

- GitHub: [@aryamehta0302](https://github.com/aryamehta0302)
- Role: Project architecture design, UI/UX design, and frontend implementation

**Deval Shah** - Full-Stack Developer & Integration Specialist

- GitHub: [@Deval2211](https://github.com/Deval2211)
- Role: API connection between frontend and backend, database management, and deployment

**Parth Panara** - Backend Developer

- GitHub: [@parth-panara-1204](https://github.com/parth-panara-1204)
- Role: Express.js server development and API mapping

---

## The Client (Frontend)

The frontend of BlogSpot is built using React 19.1.1 with Vite as the build tool, providing a fast and modern development experience. The application follows a component-based architecture with React Router DOM for seamless navigation between pages.

### Frontend Architecture

**Project Structure:**

```
frontend/src/
├── components/          # Reusable React Components
│   ├── Navbar.jsx      # Navigation with theme toggle & search
│   ├── BlogCard.jsx    # Blog display card component
│   └── Footer.jsx      # Page footer component
├── pages/              # Main Page Components
│   ├── Home.jsx        # Blog listings homepage
│   ├── Login.jsx       # User login form
│   ├── Register.jsx    # User registration form
│   ├── Profile.jsx     # User profile management
│   ├── AddBlog.jsx     # Blog creation form
│   ├── BlogDetails.jsx # Individual blog reading view
│   ├── Bookmarks.jsx   # Saved blogs page
│   └── AdminDashboard.jsx # Admin interface (future)
├── assets/             # Static Assets
│   ├── unknown_male.jpg   # Default male avatar
│   ├── unknown_female.jpg # Default female avatar
│   └── unknown.jpg        # Default neutral avatar
├── theme.css           # Global styling system
├── App.css             # Application-level styles
├── index.css           # Root styles
├── App.jsx             # Main React application component
└── main.jsx            # React entry point
```

### Key Features

#### 1. Authentication System

- **Registration:** Users can create accounts with name, email (@gmail.com validation), password (min 6 characters), and gender selection
- **Login:** Secure login with email and password validation
- **Session Management:** JWT tokens stored in localStorage with automatic logout on token expiration
- **Protected Routes:** Certain pages require authentication (Profile, Add Blog)

#### 2. Navigation Component (Navbar)

- **Dynamic Menu:** Changes based on authentication status (logged in/guest)
- **Search Bar:** Real-time search functionality for filtering blogs by title, content, or author
- **Theme Toggle:** Switch between dark and light themes with persistent preference
- **Responsive Design:** Hamburger menu for mobile devices
- **User Indicator:** Shows logged-in user's information

#### 3. Home Page

- **Blog Listings:** Grid layout displaying all published blogs using BlogCard components
- **Author Information:** Each card shows author name and avatar
- **Cover Images:** Optional blog cover images with error handling
- **Interactions:** Upvote and bookmark buttons for each blog
- **Navigation:** "Read More" button to view full blog details

#### 4. Blog Creation (AddBlog)

- **Form Fields:**
  - Title (required) - Blog post title
  - Cover Image URL (optional) - External image URL
  - Content Body (required) - Main blog content
- **Image Preview:** Real-time preview of cover image if URL is provided
- **Validation:** Client-side validation for required fields
- **Loading States:** Shows loading spinner during submission
- **Feedback:** Success and error messages after submission

#### 5. Profile Management

- **View Profile:** Display user information including name, email, bio, gender, and creation date
- **Edit Profile:** Update name and bio information
- **Profile Picture:** Upload profile pictures (5MB limit) with auto-save functionality
- **Default Avatars:** Gender-based default avatars for users without custom pictures
- **My Blogs:** View all blogs published by the current user
- **Logout:** Secure logout functionality clearing session data

#### 6. Blog Details Page

- **Full Content:** Display complete blog post with title, subtitle, and body content
- **Author Info:** Show author details with avatar and name
- **Publication Date:** Formatted date display
- **Cover Image:** Full-size cover image if available
- **Responsive Layout:** Optimized reading experience on all devices

#### 7. Bookmarks Page

- **Saved Blogs:** Display all bookmarked blogs from localStorage
- **Consistent UI:** Uses same BlogCard component as homepage
- **Empty State:** Message when no blogs are bookmarked
- **Persistence:** Bookmarks saved across browser sessions

### UI/UX Design

#### Theme System

**Dark Theme (Default):**

- Background: `#0f172a` (Dark blue-gray)
- Text: `#e2e8f0` (Light gray)
- Primary Accent: `#3b82f6` (Blue gradient)
- Secondary Accent: `#a855f7` (Purple gradient)

**Light Theme:**

- Background: `#f3f4f6` (Light gray)
- Text: `#111827` (Dark gray)
- Primary Accent: `#2563eb` (Blue gradient)
- Secondary Accent: `#a855f7` (Purple gradient)

#### Design Principles

- **Mobile-First:** Responsive design starting from mobile (320px+)
- **Card-Based Layout:** Clean, organized content presentation
- **Smooth Animations:** Hover effects and transitions for better UX
- **Consistent Typography:** Poppins font family throughout the application
- **Color Accessibility:** Proper contrast ratios for readability

### State Management

- **React Hooks:** useState and useEffect for component state management
- **localStorage:**
  - JWT authentication token
  - User profile data
  - Bookmarked blogs array
  - Theme preference (dark/light)
- **Axios:** Centralized API communication with error handling

### Routing Structure

```javascript
Route Path                Purpose
/                        Home page (all blogs)
/login                   User login page
/register                User registration page
/profile                 User profile (protected)
/add-blog                Create new blog (protected)
/blog-details/:id        View specific blog details
/bookmarks               Saved/bookmarked blogs
```

### API Integration

Frontend communicates with backend REST API using Axios:

```javascript
// Base URL
const API_URL = "http://localhost:3000/api";

// Public endpoints
GET  /blogs/              - Fetch all blogs
GET  /blogs/:id           - Fetch specific blog
POST /users/register      - User registration
POST /users/login         - User login

// Protected endpoints (require JWT token)
GET  /users/profile       - Get current user profile
PUT  /users/profile       - Update user profile
POST /users/upload-profile-image - Upload profile picture
GET  /users/my-blogs      - Get current user's blogs
POST /blogs/create        - Create new blog post
```

### Performance Optimizations

- **Vite Build Tool:** Fast development server and optimized production builds
- **Code Splitting:** Lazy loading with React Router
- **Image Optimization:** Lazy loading and error handling for images
- **Efficient Rendering:** Conditional rendering to minimize re-renders
- **State Updates:** Optimized state management to avoid unnecessary renders

---

## The Server (Backend)

The backend of BlogSpot is built with Node.js and Express.js, providing a robust RESTful API that handles all data operations, authentication, file uploads, and business logic. It connects to MongoDB for data persistence and implements security best practices.

### Backend Architecture

**Project Structure:**

```
backend/
├── config/                    # Configuration Files
│   ├── db.js                 # MongoDB connection setup
│   ├── upload.js             # Multer file upload configuration
│   └── default.json          # Database URI configuration
├── modules/                   # Mongoose Data Models
│   ├── User.js               # User schema with authentication
│   └── Blog.js               # Blog post schema
├── Routes/api/               # API Route Handlers
│   ├── users.js              # User authentication & profile routes
│   ├── blog.js               # Blog CRUD operations
│   └── auth.js               # Alternative authentication endpoint
├── uploads/                   # File Storage
│   └── profiles/             # User profile images
├── index.js                   # Express server entry point
├── package.json              # Backend dependencies
└── .env.example              # Environment variables template
```

### Database Schema

#### User Collection (MongoDB)

```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  name: String,                     // User's full name (required, trimmed)
  email: String,                    // Email address (required, unique, lowercase, @gmail.com)
  password: String,                 // Bcrypt hashed password (required, min 6 chars)
  gender: String,                   // Gender ('male' or 'female', required)
  profileImage: String,             // File path to profile image (nullable)
  bio: String,                      // User bio (max 200 chars, default: '')
  createdAt: Date,                  // Account creation date (auto-generated)
  updatedAt: Date                   // Last update date (auto-generated)
}
```

**Security Features:**

- Pre-save hook for automatic password hashing using bcrypt
- Salt rounds: 10
- comparePassword method for secure password verification
- Never stores or transmits plain text passwords

#### Blog Collection (MongoDB)

```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  userid: ObjectId,                 // Reference to User collection (required)
  title: String,                    // Blog title (required, trimmed)
  subtitle: String,                 // Blog subtitle (optional, trimmed)
  titleImage: String,               // Cover image URL (optional)
  body: String,                     // Blog content (required)
  date: Date,                       // Publication date (default: current date)
  createdAt: Date,                  // Creation timestamp (auto-generated)
  updatedAt: Date                   // Last update timestamp (auto-generated)
}
```

**Relationships:**

- Each blog is linked to a user via `userid` field
- Mongoose population used to fetch user details with blog data

### API Endpoints

#### 1. Authentication Endpoints

**Register New User**

```
POST /api/users/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "password123",
  "gender": "male"
}

Response (201 Created):
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@gmail.com",
    "gender": "male"
  }
}

Error Responses:
400 - Email already exists / Invalid email format / Password too short
500 - Server error
```

**User Login**

```
POST /api/users/login
Content-Type: application/json

Request Body:
{
  "email": "john@gmail.com",
  "password": "password123"
}

Response (200 OK):
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@gmail.com",
    "gender": "male"
  }
}

Error Responses:
400 - Invalid email or password
500 - Server error
```

**Alternative Authentication**

```
POST /api/auth
Content-Type: application/json

Request Body:
{
  "email": "john@gmail.com",
  "password": "password123"
}

Response (200 OK):
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@gmail.com",
  "gender": "male"
}

Error Responses:
400 - No User Found / Wrong Password
500 - Server error
```

#### 2. User Profile Endpoints (Protected - Require JWT Token)

**Get User Profile**

```
GET /api/users/profile
Authorization: Bearer <jwt_token>

Response (200 OK):
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@gmail.com",
  "gender": "male",
  "profileImage": "/uploads/profiles/image.jpg",
  "bio": "My bio text",
  "createdAt": "2025-11-12T00:00:00.000Z",
  "updatedAt": "2025-11-12T00:00:00.000Z"
}

Error Responses:
401 - Access token required / Invalid token
404 - User not found
500 - Server error
```

**Update User Profile**

```
PUT /api/users/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

Request Body:
{
  "name": "John Updated",
  "bio": "Updated bio text"
}

Response (200 OK):
{
  "message": "Profile updated successfully",
  "user": {
    "id": "user_id",
    "name": "John Updated",
    "email": "john@gmail.com",
    "gender": "male",
    "profileImage": "/uploads/profiles/image.jpg",
    "bio": "Updated bio text"
  }
}

Error Responses:
401 - Unauthorized
404 - User not found
500 - Server error
```

**Upload Profile Image**

```
POST /api/users/upload-profile-image
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

Request Body:
FormData with 'profileImage' file field

Response (200 OK):
{
  "message": "Profile image uploaded successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@gmail.com",
    "gender": "male",
    "profileImage": "/uploads/profiles/userid_timestamp_random.jpg",
    "bio": "My bio"
  }
}

Error Responses:
400 - No image file provided
401 - Unauthorized
404 - User not found
500 - Server error
```

**Get Current User's Blogs**

```
GET /api/users/my-blogs
Authorization: Bearer <jwt_token>

Response (200 OK):
[
  {
    "_id": "blog_id",
    "title": "My Blog Post",
    "subtitle": "Subtitle text",
    "titleImage": "https://image-url.com/image.jpg",
    "body": "Blog content...",
    "date": "2025-11-12T00:00:00.000Z",
    "userid": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@gmail.com",
      "gender": "male",
      "profileImage": "/uploads/profiles/image.jpg"
    }
  }
]

Error Responses:
401 - Unauthorized
500 - Server error
```

#### 3. Blog Endpoints

**Get All Blogs**

```
GET /api/blogs/

Response (200 OK):
[
  {
    "_id": "blog_id",
    "title": "Blog Title",
    "subtitle": "Subtitle",
    "titleImage": "https://image-url.com/image.jpg",
    "body": "Blog content...",
    "date": "2025-11-12T00:00:00.000Z",
    "userid": {
      "_id": "user_id",
      "name": "Author Name",
      "email": "author@gmail.com",
      "gender": "male",
      "profileImage": "/uploads/profiles/image.jpg"
    }
  }
]

Error Responses:
500 - Server error
```

**Get Specific Blog**

```
GET /api/blogs/:id

Response (200 OK):
{
  "_id": "blog_id",
  "title": "Blog Title",
  "subtitle": "Subtitle",
  "titleImage": "https://image-url.com/image.jpg",
  "body": "Full blog content...",
  "date": "2025-11-12T00:00:00.000Z",
  "userid": {
    "_id": "user_id",
    "name": "Author Name",
    "email": "author@gmail.com",
    "gender": "male",
    "profileImage": "/uploads/profiles/image.jpg"
  }
}

Error Responses:
404 - Blog not found
500 - Server error
```

**Create New Blog (Protected)**

```
POST /api/blogs/create
Authorization: Bearer <jwt_token>
Content-Type: application/json

Request Body:
{
  "title": "My New Blog",
  "subtitle": "Optional subtitle",
  "titleImage": "https://image-url.com/image.jpg",
  "body": "Full blog content here..."
}

Response (201 Created):
{
  "message": "Blog created successfully!",
  "blog": {
    "_id": "blog_id",
    "title": "My New Blog",
    "subtitle": "Optional subtitle",
    "titleImage": "https://image-url.com/image.jpg",
    "body": "Full blog content here...",
    "date": "2025-11-12T00:00:00.000Z",
    "userid": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@gmail.com",
      "gender": "male",
      "profileImage": "/uploads/profiles/image.jpg"
    }
  }
}

Error Responses:
400 - Title and body are required
401 - Unauthorized
500 - Server error
```

**Get Blogs by User**

```
GET /api/blogs/user/:userId

Response (200 OK):
[Array of blog objects for specified user]

Error Responses:
500 - Server error
```

### Security Implementation

#### Password Security

- **Bcrypt Hashing:** All passwords hashed with 10 salt rounds before database storage
- **Pre-save Hook:** Mongoose middleware automatically hashes passwords on user creation
- **Comparison Method:** `comparePassword()` method uses bcrypt.compare() for secure verification
- **No Plain Text:** Passwords never stored or transmitted in plain text format

#### JWT Authentication

- **Token Generation:** JWT tokens signed with secret key upon successful login/registration
- **Token Expiration:** 24-hour token validity period
- **Token Verification:** Middleware validates tokens on protected routes
- **Token Storage:** Client stores token in localStorage
- **Authorization Header:** Token sent as `Bearer <token>` in Authorization header

#### JWT Middleware Implementation

```javascript
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded.user;
    next();
  });
};
```

#### File Upload Security

- **File Type Validation:** Only image files (image/\*) accepted
- **Size Restriction:** 5MB maximum file size limit
- **Unique Naming:** Files named with userId_timestamp_random format
- **Organized Storage:** Files stored in segregated `/uploads/profiles/` directory
- **Auto-create Directory:** Upload directory created automatically if not exists

### Server Configuration

**Express Server Setup:**

- Port: 3000
- JSON Body Parser: Enabled
- URL-encoded Parser: Enabled
- CORS: Enabled for all origins (development mode)
- Static Files: Serves `/uploads` directory for profile images

**MongoDB Connection:**

```javascript
Database: blogspot
Connection String: mongodb://localhost:27017/blogspot
Connection Options: useNewUrlParser, useUnifiedTopology
Error Handling: Proper error logging and process exit on failure
```

### Error Handling

- **Try-Catch Blocks:** All async routes wrapped in try-catch
- **HTTP Status Codes:** Proper REST convention status codes
  - 200: Success
  - 201: Created
  - 400: Bad Request / Validation Error
  - 401: Unauthorized (no token)
  - 403: Forbidden (invalid token)
  - 404: Not Found
  - 500: Internal Server Error
- **Console Logging:** Error messages logged for debugging
- **User-Friendly Messages:** Clear error messages without sensitive data

---

## Code

**GitHub Repository Link:** [https://github.com/Deval2211/BLOGSPOT](https://github.com/Deval2211/BLOGSPOT)

### Installation & Setup

**Prerequisites:**

- Node.js 18+ installed
- MongoDB installed and running
- Git installed

**Backend Setup:**

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start MongoDB (if running locally)
mongod

# Start backend server
npm start
```

Backend will run on: `http://localhost:3000`

**Frontend Setup:**

```bash
# Navigate to frontend directory (in new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: `http://localhost:5173`

### Environment Configuration

Create `.env` file in backend directory:

```env
JWT_SECRET=your-super-secret-jwt-key-here
MONGODB_URI=mongodb://localhost:27017/blogspot
NODE_ENV=development
PORT=3000
```

### Project Dependencies

**Frontend (package.json):**

```json
{
  "dependencies": {
    "axios": "^1.12.2",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.8.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "eslint": "^9.33.0",
    "vite": "^7.1.2"
  }
}
```

**Backend (package.json):**

```json
{
  "dependencies": {
    "bcrypt": "^6.0.0",
    "config": "^4.1.1",
    "cors": "^2.8.5",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.18.1",
    "multer": "^2.0.2"
  }
}
```

---

## Output (Screenshots)

### 1. Home Page - Dark Theme

_Grid layout showing all blog posts with author avatars, cover images, and interaction buttons (upvote, bookmark, read more)._

### 2. Home Page - Light Theme

_Same layout in light theme demonstrating the theme toggle functionality._

### 3. User Registration Page

_Registration form with fields for name, email, password, and gender selection with modern UI design._

### 4. User Login Page

_Clean login form with email and password fields, plus link to registration page._

### 5. User Profile Page

_Profile management interface showing user information, profile picture, bio, and list of user's published blogs._

### 6. Create Blog Page (Add Blog)

_Blog creation form with title input, optional cover image URL, content textarea, and image preview functionality._

### 7. Blog Details Page

_Full blog post display with title, author information, publication date, cover image, and complete content._

### 8. Bookmarks Page

_List of bookmarked/saved blogs displayed using the same card layout as home page._

### 9. Profile Picture Upload

_Profile page showing the upload button and auto-save functionality for profile images._

### 10. Mobile Responsive Design

_Screenshots demonstrating responsive layout on mobile devices for home page, navigation menu, and blog creation._

### 11. Search Functionality

_Navigation bar with search input showing real-time filtering of blog posts._

### 12. User's Blog Collection

_Profile page section displaying all blogs created by the current user with edit options._

---

## Conclusion

BlogSpot successfully demonstrates the implementation of a full-stack MERN application with modern web development practices. The project achieves all its objectives by providing users with a secure, feature-rich blogging platform that is both functional and visually appealing.

### Key Achievements:

- ✅ Complete MERN stack implementation
- ✅ Secure JWT-based authentication with bcrypt password hashing
- ✅ RESTful API design following industry standards
- ✅ Responsive UI with dark/light theme support
- ✅ Local file upload system for profile images
- ✅ Real-time search and bookmark functionality
- ✅ Clean code architecture with proper separation of concerns

### Technical Skills Demonstrated:

- Full-stack web development (MERN stack)
- RESTful API design and implementation
- Database schema design with MongoDB
- JWT authentication and authorization
- Frontend component architecture with React
- State management and routing
- File upload handling
- Responsive web design
- Git version control

### Future Enhancements:

- Blog editing and deletion functionality
- Comment system for blog posts
- User following and notification system
- Rich text editor (Quill/TinyMCE)
- Tags and categories for blogs
- Advanced search filters and pagination
- Admin dashboard with content moderation
- Social media sharing integration

### Learning Outcomes:

This project provided hands-on experience with the complete software development lifecycle, from planning and architecture design to implementation, testing, and deployment. The team successfully collaborated using Git and GitHub, implementing industry-standard practices for web application development.

---

**Project Status:** ✅ Complete and Production Ready  
**Report Date:** November 12, 2025  
**Project Duration:** ~2 months  
**Total Lines of Code:** ~5,000+  
**Git Commits:** 50+

---

⭐ **Thank you for reviewing our project!** ⭐
