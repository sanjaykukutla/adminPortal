# MEAN Stack Application

This is a simple MEAN stack application that demonstrates how to build a full-stack web application using MongoDB, Express.js, React, and Node.js. 

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 14.x or higher)
- MongoDB (local or remote instance)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install server dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install client dependencies:

   ```bash
   cd frontend
   npm install
   ```

## Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```plaintext
PORT=3000               # The port where the server will run
MONGODB_URI=<your-mongo-uri>  # The MongoDB connection URI
JWT_SECRET=<your-jwt-secret>   # Secret key for JWT authentication
```

Replace `<your-mongo-uri>` and `<your-jwt-secret>` with your MongoDB URI and your desired JWT secret, respectively.

## Running the Application

To run the application, follow these steps:

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

   The server will start on the port defined in the `.env` file.

2. Start the frontend application:

   ```bash
   cd frontend
   ng serve
   ```

   The React application will start, and you can access it at `http://localhost:3000`.


## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
