# Hello! This is my CRUD API!

## Use 20 LTS version of Node.js

1. You need to clone my repository

```
git clone https://github.com/Mat-Kon/crud-api.git
```
2. Go to dev branch
```
git checkout dev
```
3. Install all dependencies
```
npm install
```
4. If can two mode:
    - development
    ```
    npm run start:dev
    ```
    - production
    ```
    npm run start:prod
    ```
5. Implemented endpoint **api/users**:
 - **GET api/users** is used to get all users
 - **GET api/users/{userId}** is used to get user by id
 - **POST api/users** is used to create record about new user and store it in database
 - **PUT api/users/{userId}** is used to update existing user
 - **DELETE api/users/{userId}** is used to delete existing user from database

6. Users have following properties:
 - **id** — unique identifier (string, uuid) generated on server side
 - **username** — user's name (string, required)
 - **age** — user's age (number, required)
 - **hobbies** — user's hobbies (array of strings or empty array, required)

## About tests

1. You need to start the server at any  mode
2. Run tests
```
npm run tests
```