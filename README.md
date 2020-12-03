# Full Stack JavaScript

This project does not use migration files. It simply flashes the SQL over to the database if the tables don't exist.

  - `modules/orm.config.js` sets up postgres and the ORM
  - `models/task.model.js` has `Task` definition that maps to the database
  - `routes/task.router.js` has the `/tasks` handlers that support the RESTful CRUD for the task models.
  - `server.js` contains a small function that runs `sync()` to flash over the SQL if the tables don't exist
  - `src/` contains the full react app (from Create React App (CRA))

To run the server simply `npm run server` or `npm run dev` to use nodemon. Don't forget to `npm install`.
To run the webpack client (React) run `npm run client`. 

`npm start` is meant to be used on Heroku and will start the node server *and* build the react app into the `build/` folder,
which is ready to be served out by the express static server.

### .env file (database config)

The `.env` file should contain your local auth information. This should work with heroku too. You can even 
use SQLite3 instead of postgres (but still support postgres on Heroku because Heroku does not support SQLite)

.env w/ Postgres
```
DATABASE_URL=postgres://username:password@localhost:5432/db_name
```

.env w/ SQLite
```
DATABASE_URL=sqlite://tasks.db
```