# sequelize intro

This project shows how to use sequelize. To set up, simply create `.env` file with the proper postgres connection string (see `.env.example`) and create your database. The server.js will create all your tables for you if they don't exist.

This project does not use migration files. It simply flashes the SQL over to the database if the tables don't exist.

  - `modules/orm.config.js` sets up postgres and the ORM
  - `models/` has the `Album` and `Artist` models set up, including the mapping to SQL
  - `server.js` contains a small function that runs `sync()` to flash over the SQL if the tables don't exist
  - `routes/` has the `/albums` and `/artists` route handlers that show how to do the RESTful CRUD for the models.

To run simply `npm start` or `npm run dev` to use nodemon. Don't forget to `npm install`.

The `.env` file should contain your local auth information. This should work with heroku too.

.env
```
DATABASE_URL=postgres://username:password@localhost:5432/db_name
```