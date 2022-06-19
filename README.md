# CRUD API

API which provides the abilities to Create, Update, Read and Delete data in an in-memory database.

### Requirements

- Nodejs v16.x
- npm v8.x

### Installation

1. Clone repository

```bash
git clone https://github.com/markflerko/CRUD-API.git
```

2. Go into project folder

```bash
cd CRUD-API
```

3. Change branch

```bash
git checkout crud-api
```

4. Install dependencies

```bash
npm i
```
or
```bash
npm ci
```


5. Create and fill in .env based on .env.sample

```env
PORT=****
TEST_PORT=****
```

### Command syntax

1. Run dev server

```bash
npm run start:dev
```

2. Run prod server

```bash
npm run start:prod
```

3. Run tests

```bash
npm run test
```

4. Run dev server with multiple instances

```bash
npm run cluster:dev
```

5. Run prod server with multiple instances

```bash
npm run cluster:prod
```



### Endpoints

- API path `/users`:

  - **GET** `/` returns all users
  - **GET** `/${userId}` returns a user with corresponding `userId`
  - **POST** `/` creates record about new user and store it in database
  - **PUT** `/${userId}` updates existing user
  - **DELETE** `/${userId}` deletes existing user from database

- users are stored as `objects` that have the following properties:
  - `id` — unique identifier (`string`, `uuid`) generated on server side
  - `username` — user's name (`string`, **required**)
  - `age` — user's age (`number`, **required**)
  - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)
