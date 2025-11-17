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

## 🛠 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd final-project-nodejs-react-modules-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the project root:
   ```env
   # Database
   DATABASE_DIALECT=postgres
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_NAME=your_database_name
   DATABASE_USERNAME=your_username
   DATABASE_PASSWORD=your_password

   # JWT
   JWT_SECRET=your_super_secret_jwt_key

   # Server
   PORT=3000
   ```

4. **Create the database**
   ```bash
   createdb your_database_name
   ```

5. **Initialize the database**
   ```bash
   # If using Sequelize CLI
   npx sequelize db:migrate
   npx sequelize db:seed:all
   ```

6. **Start the application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

   Server will run on `http://localhost:3000`

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
