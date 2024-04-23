# Task Manager

## Introduction
Task manager application with crud operation, authentication, and filtering tasks based upon status, priority.

## Project Type
Backend | Fullstack

## Deplolyed App
Frontend: [https://deployed-site.whatever](https://bestbookbuddies.vercel.app/)
Backend: https://best-book-buddies.onrender.com/
 

## Directory Structure
```
my-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   └── authentication.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── task.route.js
│   │   └── user.route.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend/
    ├── scripts/
    │   ├── index.js
    │   ├── login.js
    │   └── register.js
    ├── styles/
    │   ├── index.css
    │   ├── login.css
    │   └── register.css
    ├── index.html
    ├── login.html
    └── register.html
```





## Features
List out the key features of your application.

- Authentication
- Create Tasks
- Delete Tasks
- Edit Tasks
- Retrive Tasks
- Filter Tasks with status and priority

## API Endpoints
Develop the following RESTful API endpoints to manage task and user data:

- User Authentication:
    - `POST /users/register` - Register new users.
    - `POST /users/login` - Authenticate users and return a JWT.
- Task Management:
    - `POST /tasks` - Create a new task.
    - `GET /tasks` - Retrieve all tasks.
    - `PUT /tasks/{id}` - Update a specific task, including moving it between statuses.
    - `DELETE /tasks/{id}` - Delete a specific task.
    - `GET /tasks/filter` - Retrieve tasks based on filtering criteria.


## Technology Stack
List and provide a brief overview of the technologies used in the project.

- HTML
- CSS
- Javascript
- Node.js
- Express.js
- MongoDB
- JWT
- bcrypt
