# Backend API (Node.js + PostgreSQL)

Backend API for a full-stack application built with Node.js, Express, and PostgreSQL using Sequelize ORM. Provides a secure and scalable RESTful API.

## 🚀 Features

- ✅ JWT-based user authentication
- ✅ User registration and login
- ✅ User management (profile, current user)
- ✅ Automatic avatar generation via Gravatar
- ✅ Input validation with Joi
- ✅ Error handling and centralized exception handling
- ✅ File upload (avatars)
- ✅ Request logging (Morgan)
- ✅ CORS support
- ✅ Scalable architecture (MVC pattern)

## 📦 Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: Joi
- **File Upload**: Multer
- **Avatar**: Gravatar
- **Logging**: Morgan
- **Environment**: dotenv

## 📁 Project Structure

```
├── app.js                 # Application entry point
├── package.json           # Project dependencies
├── routes/                # API routes
│   └── authRouter.js      # Authentication routes
├── controllers/           # Controllers (request handlers)
│   └── authControllers.js
├── services/              # Business logic
│   └── authServices.js
├── db/                    # Database operations
│   ├── models/           # Sequelize models
│   │   ├── Users.js
│   │   └── Ingredients.js
│   └── sequelize.js      # Sequelize configuration
├── middlewares/          # Middleware
│   ├── authenticate.js   # JWT authentication
│   ├── isEmptyBody.js   # Empty body check
│   └── uploadAvatar.js   # Avatar upload
├── schemas/              # Validation schemas (Joi)
│   └── authSchemas.js
├── helpers/              # Helper functions
│   ├── ctrlWrapper.js    # Controller wrapper
│   ├── HttpError.js      # HTTP error class
│   ├── validateBody.js   # Request body validation
│   └── getPagination.js  # Pagination
├── constants/            # Constants
│   └── userConstants.js
└── public/               # Static files
    └── avatars/          # Uploaded avatars
```

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create .env file (see configuration below)

# 3. Create PostgreSQL database
createdb your_database_name

# 4. Start the server
npm run dev
```

The server will start on `http://localhost:3000` and database tables will be created automatically on first run.

## 🛠 Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** (comes with Node.js) or **yarn**

### Step-by-Step Installation

#### 1. Clone the repository

```bash
git clone <repository-url>
cd final-project-nodejs-react-modules-backend
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Configure environment variables

Create a `.env` file in the project root directory:

```env
# Database Configuration
DATABASE_DIALECT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_postgres_username
DATABASE_PASSWORD=your_postgres_password

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Server Port (optional, defaults to 3000)
PORT=3000
```

**Important Notes:**
- Replace `your_database_name`, `your_postgres_username`, and `your_postgres_password` with your actual PostgreSQL credentials
- For `JWT_SECRET`, generate a strong random string (you can use: `openssl rand -base64 32`)
- If you're using a local PostgreSQL instance, you may need to remove or modify the SSL configuration in `db/sequelize.js` (set `ssl: false` in `dialectOptions`)

#### 4. Create PostgreSQL database

**Option A: Using createdb command (recommended)**
```bash
# If you get authentication error, try with postgres user:
createdb -U postgres your_database_name

# Or specify your username:
createdb -U your_username your_database_name
```

**Option B: Using psql**
```bash
# Connect as postgres superuser (most common)
psql -U postgres

# Or connect with your username
psql -U your_username

# Then create database:
CREATE DATABASE your_database_name;
\q
```

**Option C: Using pgAdmin (GUI)**
- Open pgAdmin
- Right-click on "Databases" → "Create" → "Database"
- Enter database name and click "Save"

**Common Issues:**
- If you get "password authentication failed", try using the `postgres` superuser:
  ```bash
  createdb -U postgres your_database_name
  ```
- If you don't know the postgres password, you may need to reset it or use peer authentication (on macOS/Linux)

#### 5. Start the application

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

#### 6. Verify the setup

- Server should start on `http://localhost:3000`
- You should see: `Server is running. Use our API on port: 3000`
- Database connection message: `Database connection successful.`
- Database tables (`user`, `ingredient`) will be created automatically on first run

### Troubleshooting

**Password authentication failed:**
- Try using the `postgres` superuser: `createdb -U postgres your_database_name`
- If you don't know the postgres password, reset it:
  ```bash
  # On macOS with Homebrew:
  psql postgres
  ALTER USER postgres PASSWORD 'newpassword';
  
  # Or use peer authentication (no password needed):
  createdb -U postgres your_database_name
  ```
- Check your PostgreSQL user exists: `psql -U postgres -c "\du"`
- Make sure PostgreSQL is running: `brew services list` (macOS) or `sudo systemctl status postgresql` (Linux)

**Database connection error:**
- Verify PostgreSQL is running: `pg_isready` or `psql -U postgres -c "SELECT 1;"`
- Check your `.env` file has correct database credentials (username, password, database name)
- For local development, you may need to disable SSL in `db/sequelize.js`:
  ```javascript
  dialectOptions: {
      ssl: false,  // Change from true to false for local development
  }
  ```
- Verify database exists: `psql -U postgres -l` (lists all databases)

**Port already in use:**
- Change `PORT` in `.env` file to a different port (e.g., 3001)
- Or stop the process using port 3000: `lsof -ti:3000 | xargs kill -9`

**Module not found errors:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## 📡 API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "user": {
    "email": "user@example.com",
    "subscription": null
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "user@example.com",
    "subscription": null
  }
}
```

#### Logout User
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

**Response (204):** No Content

#### Get Current User
```http
GET /api/auth/current
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "email": "user@example.com",
  "subscription": null
}
```

## 🗄 Database Models

### Users

| Field     | Type     | Description                    |
|-----------|----------|--------------------------------|
| id        | INTEGER  | Primary key (auto-increment)   |
| name      | STRING   | User name (max 16 characters)  |
| email     | STRING   | Email (unique, validated)      |
| password  | STRING   | Hashed password (bcrypt)       |
| avatar    | STRING   | Avatar URL (Gravatar)          |
| token     | STRING   | JWT token (nullable)           |
| createdAt | DATE     | Creation date                  |
| updatedAt | DATE     | Update date                    |

### Ingredients

| Field     | Type     | Description                    |
|-----------|----------|--------------------------------|
| id        | INTEGER  | Primary key (auto-increment)   |
| name      | STRING   | Ingredient name                |
| decs      | TEXT     | Ingredient description         |
| img       | STRING   | Image URL                      |
| createdAt | DATE     | Creation date                  |
| updatedAt | DATE     | Update date                    |

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User registers or logs in
2. Server generates a JWT token with 24-hour expiration
3. Token is saved in the user's database record
4. Client sends token in `Authorization: Bearer <token>` header
5. `authenticate` middleware verifies token on protected routes

## 🎨 Validation

Input validation is performed using Joi:

- **Email**: must match regex pattern
- **Password**: minimum 6 characters
- **Name**: maximum 16 characters

## 🖼 Avatars

Upon registration, a user avatar is automatically generated via Gravatar service based on the email address.

## 📝 Scripts

```bash
# Run in development mode (with nodemon)
npm run dev

# Run in production mode
npm start
```

## 🔗 Frontend

Frontend part of the project is available at:
[final-project-nodejs-react-modules-frontend](https://github.com/sergiishevchenko/final-project-nodejs-react-modules-frontend)

## 🛡 Error Handling

The application uses centralized error handling:

- **404**: Route not found
- **401**: Unauthorized
- **409**: Conflict (e.g., email already in use)
- **500**: Internal server error

---

**Note**: Make sure all environment variables are properly configured before running the application.
