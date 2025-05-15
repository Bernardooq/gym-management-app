# Gym Management App

A web application designed to streamline gym operations and provide a better experience for both users and coaches. This app enables gym staff to manage memberships, track attendance, monitor users, and more.

## Features

- User registration and login
- Membership creation and editing
- Attendance tracking
- User monitoring
- Coach/admin dashboard

## Tech Stack

- Frontend: HTML, CSS, JavaScript, Bootstrap
- Backend: Express.js (Node.js), FastAPI (Python)
- Database: MongoDB
- Other: Mongoose, CORS

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Bernardooq/gym-management-app
cd gym-management-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a .env file in the root directory and add your MongoDB URI, You can use MongoDB Atlas or a local MongoDB instance.

```bash
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
```

### 4. Run the server

```bash
node Server.js
```
