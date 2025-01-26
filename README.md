# Welcome to your Civic Voices TO-do-list project

## Project info
This project is a full-stack Todo List application that consists of a React frontend and a RESTful backend server built with Node.js and Express. The backend utilizes Firestore (Firebase) as the database.

# Features

## Frontend:

Add new todos with optimistic UI updates

Toggle todo completion status

Delete todos with real-time feedback

Responsive UI built with React components

Toast notifications for user feedback

## Backend:

RESTful API endpoints for CRUD operations

Firestore integration for persistent data storage

CORS support for cross-origin requests

Environment variable configuration using dotenv

**URL**: 

**Use your preferred IDE**

If you want to work locally using your own IDE,clone this repo

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd civic-voices-to-do-list

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev

#step 5 :start and run your backend 

cd backend

#step 6: install necessary dependecies
npm i

#step 7: start and run your backend development server
node index.js

```
## API Endpoints
Method   Endpoint         Description

GET     /api/todos       Fetch all todos

POST    /api/todos       Add a new todo

PUT     /api/todos/:id   Update a todo status

DELETE  /api/todos/:id   Delete a todo

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- express
- nodejs
- firebase(firestore intergration)
- dotenv for environment variables

## License

This project is licensed under the MIT License.

