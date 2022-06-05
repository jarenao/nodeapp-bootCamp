> # DESPLIEGUE EN SERVIDORES

## Práctica desplegar app React | Node.js | MongoDB

#### App React -> http://54.164.76.196

#### App Node | Mongo -> http://ec2-54-164-76-196.compute-1.amazonaws.com/

<br><br>

> # NODEPOP-BOOTCAMP

## Practice WEB-API | Node.js | MongoDB

### To start the application use:

```sh
git clone
cd nodeapp
npm install
```

In production:

Copy .env.example to .env and set config values

```sh
cp .env.example .env
```

```sh
npm start
```

In development:

```sh
npm run dev
```

### Initialising the DB

To initialise the DB to the initial state, you can use the command:

```sh
npm run initDB
```

**WARNING** _This will erase all data from the DB and load the initial state._

## API Methods

The API is accessed in /api

Authentication (postman)
User/password
user@example.com - 1234
admin@example.com - 1234

- /api/authenticate

Save the token to access the items

List of objects

- GET /api/items?token={token}

Search for an object by

- GET /api/items/:name

Create an object

- POST /api/items

Removes an object

- DELETE /api/items

Update an object

- PUT /api/items

Query String

- /api/items?tags=mobile

- /api/items?state=venta

Pagination

- /api/items/?skip=4&limit=2
