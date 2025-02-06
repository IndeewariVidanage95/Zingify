
# Zingify

This is a React-based web application designed as a social media platform for dog lovers. It was developed by a software engineering student as a learning project to understand the process of building a social media platform. The application aims to bring dog enthusiasts together, allowing them to connect, share, and interact in a fun and engaging way.

This application has developed with the following tech stack. 

    React 
    Node.js with Express
    CSS
    MongoDB
    

## Pre-installation Requirements

Please make sure these are installed.

    Node.js
    npm
    
You need a MongoDB account (https://www.mongodb.com/)

## Clone the Repository

```bash
  git clone https://github.com/IndeewariVidanage95/Zingify.git
  cd Zingify
```

## Backend Setup

1. Navigate to the source directory:

```bash
  cd server
```

2. Install dependencies:

```bash
  npm install
```

3. Configure Environment Variables:

Create a .env file in the server directory and add the following:
```bash 
  MONGO_URI=your-mongodb-connection-string
  JWT_SECRET=your-secret-key
  PORT=3000
```

4. Start the Backend Server

```bash
  npx nodemon index.js
```

## Frontend Setup

1. Navigate to the source directory:

```bash
  cd client
```

2. Install dependencies:

```bash
  npm install
```
4. Start the client app

```bash
  npm start
```
React app will start at http://localhost:3000/


