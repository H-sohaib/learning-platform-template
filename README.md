# Learning Platform NoSQL

This project is a backend API for an online learning platform, created as a final module project for NoSQL. The project follows professional code organization practices and includes clear separation of responsibilities, proper error handling, and modular code organization.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB
- Redis

### Setting Up MongoDB and Redis on Linux

#### MongoDB

```bash
  sudo apt install mongodb
  sudo systemctl start mongod
  sudo systemctl enable mongod #(Optional) Enable MongoDB to start on boot
```

#### Redis

```bash
  sudo apt install redis-server
  sudo systemctl start redis.service
  sudo systemctl enable redis.service #(Optional) Enable MongoDB to start on boot
```

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/[your-username]/learning-platform-nosql
   cd learning-platform-nosql
   ```

````

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a .env file in the root directory and add the following variables:

```bash
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=learning_platform
REDIS_URI=redis://localhost:6379
PORT=3000
```

4. **Start the Server**:

```bash
npm start
npm test
```

4. **Running Tests**:
   To run the tests, use the following command:

```bash
npm start
npm test
```

### Project Structure

```bash
learning-platform-nosql/
├── __tests__/
│   └── app.test.js
├── .env
├── .gitignore
├── jest.config.js
├── package.json
├── README.md
└── src/
    ├── app.js
    ├── config/
    │   ├── db.js
    │   ├── env.js
    ├── controllers/
    │   └── courseController.js
    ├── routes/
    │   └── courseRoutes.js
    └── services/
        ├── mongoService.js
        └── redisService.js
```

- `app.js`: Entry point of the application. Initializes database connections, configures middlewares, and starts the server.
- `config/db.js`: Manages MongoDB and Redis connections.
- `config/env.js`: Loads and validates environment variables.
- `controllers/courseController.js`: Contains business logic for course-related operations.
- `routes/courseRoutes.js`: Defines routes for course-related endpoints.
- `services/mongoService.js`: Provides reusable MongoDB operations.
- `services/redisService.js`: Provides reusable Redis operations.

## Technical Choices

- **Express**: Used as the web framework for building the API.
- **MongoDB**: Chosen for its flexibility and scalability in handling course data.
- **Redis**: Used for caching to improve performance.
- **dotenv**: Manages environment variables securely.
  Answers to Questions in Comments
  Why create a separate module for database connections?
- **Jest**: Used for testing because it provides a comprehensive and easy-to-use testing framework with built-in support for mocking, assertions, and coverage reporting.

## Explanation of Tests

The project includes tests to ensure that the API responds as expected. The tests are written using Jest and Supertest.

### GET /api/courses/:id

- Tests if the endpoint responds with a 200 status code when a course with the given ID exists.
- Tests if the endpoint responds with a 404 status code and an appropriate message when a course with the given ID does not exist.

### GET /api/courses/stats

- Tests if the endpoint responds with a 200 status code and returns course statistics, including:
  - Total courses
  - Average duration
  - Total revenue
  - Courses by instructor
  - Courses by topic

### POST /api/courses/create (commented out)

- Tests if the endpoint creates a new course and responds with a 201 status code and the newly created course's ID. This test is currently commented out because each time the test runs it create new course but can be enabled as needed.
````
