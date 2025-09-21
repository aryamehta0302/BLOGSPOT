# BlogSpot

A full-stack MERN (MongoDB, Express, React, Node.js) blog platform where users can register, log in, create, view, bookmark, and manage blog posts. Includes user profile management with gender-based avatars and image upload.

## Features

- User registration and login
- Gender selection during registration (male/female)
- Profile page with gender-based default avatars and photo upload
- Create, view, and bookmark blog posts
- Admin dashboard for blog management
- Responsive, modern UI with React and Vite
- Backend API with Express and MongoDB

## Folder Structure

```
backend/           # Node.js + Express + MongoDB API
  index.js
  config/
  modules/
  Routes/
frontend/          # React + Vite frontend
  src/
    components/
    pages/
    assets/
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure MongoDB connection in `config/default.json`:
   ```json
   {
     "mongoURI": "mongodb://localhost:27017/blogspot"
   }
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend dev server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Environment Variables

- Backend: Configure MongoDB URI and secrets in `backend/config/default.json`.
- Frontend: No special environment variables required for development.

## CORS

CORS is enabled in the backend to allow requests from the frontend during development.

## License

MIT

---

Feel free to contribute or raise issues!
