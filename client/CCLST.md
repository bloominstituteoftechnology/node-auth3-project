#  Implement a React client:


- [ ] add client side routes and components for `signup`, `signin` and showing the `list of users` stored in the database.


- [ ] the `/signup` route should provide a form to gather `username`, `password` and `race` for the user and make a `POST` request to the `/api/auth/register` route on the API. If the user is created successfully, take the returned token, save it to the browser's local storage and redirect the user to the `/users` route, where they should see the list of users.


- [ ] the `/signin` route should provide a form to gather `username` and `password` for the user and make a `POST` request to the `/api/auth/login` route on the API. Upon successful login, persist the returned token to the browser's local storage and redirect the user to the `/users` route.


- [ ] the `/users` route should read the token from local storage and make a `GET` request to the `/api/users` route on the API attaching the token as the value of the `Authorization` header.


- [ ] provide a button to `sign out` that will remove the token from local storage.
