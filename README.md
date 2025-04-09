# Task Management App

This is a task management application built using React for the frontend and Node.js (Express) for the backend and database with Mysql ORM Sequelize. The app allows users to register, log in, and manage their tasks with full CRUD (Create, Read, Update, Delete) functionality. It uses JWT tokens and cookies for authentication, and Bcryptjs for password hashing.

## Features

- **User Authentication:**

  - Register a new user.
  - Log in and receive a JWT token.
  - Log out (clear cookies).

- **Task Management:**

  - Add, fetch, update, and delete tasks after the user is logged in.

- **Authentication via JWT:**
  - User credentials are hashed using Bcryptjs.
  - JWT tokens are stored in cookies for persistent login.

## Project Structure

### Backend

The backend is built using Express, with the following key dependencies:

- `bcryptjs`: For password hashing.
- `cookie-parser`: For handling cookies.
- `cors`: To enable cross-origin requests.
- `dotenv`: For environment variable management.
- `express`: Framework for handling server requests.
- `jsonwebtoken`: For generating and verifying JWT tokens.
- `mysql2` and `sequelize`: For database interaction using MySQL.

#### Backend Setup

1. Clone the repository.
   git clone https://github.com/anuj-dhungana-dev/Task-Manage
2. Install dependencies:
   cd backend
   npm install
   nodemon src/index.js

.env
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=task_manager
JWT_SECRET=your_secret_key

### frontend

1. Install dependencies and Run:

   cd frontend
   npm install
   npm run dev
