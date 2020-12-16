# Full Stack JavaScript Workshop

Let's build a full-stack JavaScript react with Node, Express, React, and SQLite/Postgres! (PERN Stack).

This project does not use migration files. It simply flashes the SQL over to the database if the tables don't exist.
This project uses Sequelize, which means that we can use SQLite or PostgreSQL and seamlessly switch between the two. 
See the note below on setting up your `.env` file for either database. SQLite is convenient since nothing has to 
be installed on your machine to get up and running (SQLite is backed by a file rather than a full database server).

Sequelize will create our table structure for us with `CREATE IF NOT EXISTS` by running `Model.sync()` (see `server.js`)

To get up and running, run `npm install` and boot the server and client separately: `npm run server` and `npm run client`.

Project Layout:
  - `server/modules/orm.config.js` sets up sqlite/postgres connection using environment variable DATABASE_URL stored in `.env`
  - `server/models/task.model.js` has `Task` definition that maps from JavaScript land into the database
  - `server/routes/task.router.js` has the `/tasks` handlers that support the RESTful CRUD for the task models.
  - `server/server.js` boots our web server and contains a small function that runs `sync()` to flash over the SQL if the tables don't exist
  - `src/` contains the full react app (from Create React App (CRA)). Fully functional, already working with axios calls for HTTP requests.
  - `package.json` contains the dependencies for BOTH server and client. Amazing! This is a single unified project! You can also
    see the commands for running client and server.

To run the server simply `npm run server` or `npm run dev` to use nodemon. Don't forget to `npm install`.
To run the webpack client (React) run `npm run client`. For development, run the server and client in different terminals and
check the respective output for logs.

`npm start` is meant to be used on Heroku and will start the node server *and* build the react app into the `build/` folder,
which is ready to be served out by the express static server. When working locally, all requests from the react app to
port 3000 will be proxied to localhost:5000 (see `package.json`)

### Task API

The completed and fully working project is available on the `solution` branch. The `main` branch has
a fully functional React App but the server is incomplete. We need to build out the Task API by 
turning on the Task model in `models/task.js` and completing the HTTP handlers in `routes/task.router.js`.

We can test our routes with `curl` at the command line or `Postman`.

A task looks like this:
``` JSON
{
        "id": 28,
        "description": "Take out the trash",
        "done": false,
        "createdAt": "2020-12-16T21:49:58.056Z",
        "updatedAt": "2020-12-16T21:49:58.056Z"
    }
```

The React app expects be able to perform RESTful CRUD operations (Create/Read/Update/Delete) using 
the `/tasks` endpoint. All requests should be made with `Content-Type: application/json` to ensure
proper encoding of data, although `xxx-form-urlencoded` will work too.

`GET /tasks` returns a list of tasks with HTTP 200 OK:
```
[
    {
        "id": 30,
        "description": "Take out the trash",
        "done": false,
        "createdAt": "2020-12-16T22:04:11.033Z",
        "updatedAt": "2020-12-16T22:04:11.033Z"
    },
    {
        "id": 31,
        "description": "Teach the fullstack JS workshop!",
        "done": false,
        "createdAt": "2020-12-16T22:04:15.466Z",
        "updatedAt": "2020-12-16T22:04:15.466Z"
    }
]
```

`POST /tasks/` will create a new task, taking a JSON object in the body: `{ "description": "Take the trash out" }`.
The only accepted and required field is `description`. The `id` is auto-generated along with 
`createdAt` and `updatedAt`. `done` is defaulted to `false` for new tasks. Returns 201 CREATED.

`PUT /tasks/:id` will update a task as complete or incomplete. The HTTP body should be a JSON 
object with a single key: `{ "done": false }` to mark the task as incomplete, or `{ "done": true }`
to mark a task as complete. Returns 200 OK.

`DELETE /tasks/:id` will delete a task with the given id and return 204 NO CONTENT. 
ie: `DELETE /tasks/10` will delete a task with id 10.

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

## Deploying to Heroku

Heroku deployment is crazy simple because we're already set up to respect the environment variables DATABASE_URL and PORT.
Heroku uses PORT variable (in `server.js`) to tell our app which port it should listen on to receive incoming HTTP requests
coming in from the internet to the heroku cloud infrastructure. DATABASE_URL will be set with the username/password and 
configuration options for the Heroku PostgreSQL database instance. This project is already configured to use both of these.

To deploy to heroku, go to https://heroku.com and sign up with an account. Download the Heroku command-line tools. Heroku
uses git to deploy so if you haven't yet, initialize a git repository and make your first commit:

```
git init
git add .
git commit -am "Committing my repo so we can deploy to heroku!"
```

Do the one-time setup to create an app and add the database to your account
1. Run `heroku login` to login to Heroku at your command line
2. Run `heroku create` to create a new app on heroku's free tier. This also adds a git remote to your
  local repository. Verify with `git remote -v`
3. Run `heroku addons:create heroku-postgresql:hobby-dev` to add the free PostgreSQL hobby tier to your heroku account.

Now your heroku tooling is set up and you have created an app on their infrastructure. You can login @ heroku.com
and verify that an app is there and its configured w/ a DATABASE_URL that points to a PostgreSQL instance.

Now to deploy its very simple: `git push heroku main`. That's it!

Heroku will accept the git push and kick off the build. Heroku will recognize that this is a node app, 
and will attempt to run `npm install` and `npm start` - so you'll need to make sure that a) Your package.json
has all the dependencies in it and is up to date, and b) `npm start` is configured to build your react app and
kick off your server. You can see in package.json that we have it configured to do just that: 
```
    "start": "react-scripts build && node server/server.js",
```

Sequelize will take care of creating an empty database for us when the app boots up. Run `heroku open` or visit 
the URL in the terminal to see your app working!