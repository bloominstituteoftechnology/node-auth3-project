# Mongo Auth Mini
Topics:
  * Express Middleware 

## Description
 - The goal of this project is to write middleware for the Mongo-II that you completed last sprint.
## Running the Project
- Run `npm install` to download the dependencies.
- Run `npm test` to run the tests. If you'd like, you can run `npm run watch`
  to automatically re-reun the tests when you make modifications.

## Instructions

- Write a function called findPostMiddleware.
  - This function will take in three arguments -
    - req
    - res
    - next
  - This function will take parts from routes `/accepted-answer/:soID` and `/top-answer/:soID`
    - (You'll need to erase some parts of those routes and implement them inside the findPostMiddleware function)
  - Implement this findPostMiddleware in the two routes you had to modify.
