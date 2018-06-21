(1x)mongod for DB to be running before server starts..
(2x)yarn install and yarn start for the server....
(3x)modiffy middleware.js so cors uses authentication...
(4x)test the registration endpoint('/api/auth/register'): with an object that contains { "username": "moises", "password": "12345", "race":"human" }`

## Client Todo:
(1x) yarn install
(2x) yarn add axios react-router-dom
(3x) Yarn Start to test the app.
(4) Create [Sign In] [Sign Up] [User List] Components.
(5) Route the components
(6) Test render with hard coded text.
(7) Axios functionality added and finally link the components to each other.
(8) Component Flow: SignUp -> SignIn -> User List

## Server Todo:
(1) Implement JWT in our server
(2) Inject into Register Route already provided
(3) Create a Login Route with JWT expected from postman/client
(4) Global Middleware Restrict Acess to all Routes Insidde (/api/users)
    -> Send a HTTP code of 401 to the user that is not auhenticated and tries to acess those routes.

####Setup

- [x] Fork and Clone this repository.
- [x] **CD into the server folder**.
- [x] type `yarn install` to download the server dependencies.
- [x] type `yarn start` to run the server, and leave it running.
- [x] **In a separate terminal window, CD into the client folder**.
- [x] type `yarn install` to download the server dependencies.
- [x] type `yarn start` to execute the client application.
- [x] Ensure that you have an instance of `MongoDB` running.


#### Assignment

- [x] Server Middleware
    * [x] CORS
        - [x] Modify CORS Options  -- origin -- credentials
- [x] Routes
    * [x] inspect the code to figure out which routes are already implemented and where you need to make changes to add support for JWTs.
- [x] JWTs Authentication Workflow
    * [?] Register
    * [x] Login
- [ ] Restrict Access
    * [ ] add the functionality to restrict access to `/api/users` to authenticated users only. If a non authenticated user tries to make a request the server should return the appropriate `HTTP status code`.
- [ ] React client
    * [ ] Verify Create-react-app already created
    * [ ] Routes
        * [ ] Register
        * [ ] SignIn
        * [ ] UserList
- [ ] Register Component
    * [ ] Provide a form that gathers `username`, `password` and `race` for user
    * [ ] `POST` request to the `/api/auth/register` route on the API.
    * [ ] If the user is created successfully, take the returned token, save it to the browser's local storage and redirect the user to the `/users` route, where they should see the list of users.
- [ ] Login Component
    * [ ] form that gathers `username` and `password` for the user 
    * [ ] `POST` request to the  `/api/auth/login` route on the API.
    * [ ] Upon successful login, persist the returned token to the browser's local storage and redirect the user to the `/users` route.
- [ ] UserList Component
    * [ ] the `/users` route should read the token from local storage 
    * [ ] `GET` request to the `/api/users` route on the API attaching the token as the value of the `Authorization` header.
    * [ ] provide a button to `sign out` that will remove the token from local storage.

###Stretch Problems
- [ ] **Same Race**
    add the code necessary so that when a client makes a `GET` request to `/api/users` the server only returns documents with the `same race` as the logged in user. 
- [ ] **Redirect**
    add any extra functionality to make the application more user friendly like showing a message and redirecting to `/signin` if an unauthenticated user tries to access the list of users in the `/users` route.