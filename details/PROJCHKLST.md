## Download and Run Starter Code

- [x] Fok and Clone this repository.
- [x] **CD into the server folder**.
- [x] type `npm install` to download the server dependencies.
- [x] type `npm start` to run the server, and leave it running.
- [x] **In a separate terminal window, CD into the client folder**.
- [x] type `npm install` to download the server dependencies.
- [x] type `npm start` to execute the client application.
- [x] Ensure that you have an instance of `MongoDB` running.

## Assignment

- [x] inspect the code to figure out which routes are already implemented and where you need to make changes to add support for JWTs. This will help you practice reading existing code.
- [ ] implement the authentication workflow (register and login) on the server using JSON Web Tokens.
- [ ] add the functionality to restrict access to `/api/users` to authenticated users only. If a non authenticated user tries to make a request the server should return the appropriate `HTTP status code`.

## Stretch Problem

- [ ] add the code necessary so that when a client makes a `GET` request to `/api/users` the server only returns documents with the `same race` as the logged in user. For example if the logged in user is a _human_, then only users of the human race should be returned; if the logged in user is a _hobbit_ only the hobbits should be returned.

- [ ] add any extra functionality to make the application more user friendly like showing a message and redirecting to `/signin` if an unauthenticated user tries to access the list of users in the `/users` route.
