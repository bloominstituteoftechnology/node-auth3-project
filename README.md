# Auth Mini 
Topics:
  * Express Middleware
  * Passwords
  * Authentication

## Description
 - The goal of this project is to write middleware for the Mongo II: StackQuery project.
## Running the Project
- Run `yarn install` to download the dependencies.
- Ensure that you have an instance of `mongod` running in another terminal.
- Run `yarn test` to run the tests. If you'd like, you can run `yarn run watch`
  to automatically re-run the tests when you make modifications.

## Instructions

The route handlers for `/accepted-answer/:soID` and `/top-answer/:soID` both find the post with the associated `soID`. They then go on to do different things with that post. To consolidate this logic, write a piece of local middleware that finds the post with the given `soID`, and makes it accessible to both these routes. The middleware should respond with an appropriate status code and error if no such post can be found. Run the tests to ensure your middleware works.
