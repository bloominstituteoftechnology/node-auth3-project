# JWT Authentication Mini

Topics:

* Authentication
* Express Middleware
* Mongoose Middleware
* Hashing Passwords
* Using JSON Web Tokens (JWTs)

## Description

In this project we'll implement a full authentication workflow (register/login/logout/restrict endpoint) using Node.js, Express, MongoDB and JSON Web Tokens on the server and a React Web Application for the client.

## Running the Project

* Run `yarn install` to download the dependencies.
* Ensure that you have an instance of `mongod` running in another terminal.

## Instructions

* Implement authentication workflow using JSON Web Tokens.
* Implement GET to `/api/users` that should return a list of users only if the user is logged in.
* Implement a React client to test your API.
