const express = require('express');
const cors = require('cors');
require('dotenv').config(); // pull in environment variables

//////////////////// Set up our database ORM :) ////////////////////
// Database init - create Tables if not there. Migration files are better but this works for now.
// if we dont await for the each .sync(), subsequent dependent .sync() calls may
// crash initially  because the earlier tables are not done being created.
// this is an anonymous async arrow function that just gets immediately invoked then discarded
const Task = require('./models/task.model');
(async () => await Task.sync())();

////////////////////// Standard Express Set up //////////////////////
const app = express();
const bodyParser = require('body-parser'); // makes http body available on req.body

// Route includes
const taskRouter = require('./routes/task.router'); // TODO uncomment this

// cors
app.use(cors());
// Body parser middleware
app.use(bodyParser.json()); // enables accepting content-type application/json
app.use(bodyParser.urlencoded({ extended: true })); // enables accepting content-type x-www-form-urlencoded
app.use(express.static("build/")); // serve out anything you find in the build/ folder (used in production/heroku)

// Routes
// route all requests to /tasks/* to the taskRouter
app.use('/tasks', taskRouter); // TODO: uncomment this

// Listen on port 5000 unless PORT is in environment vars (heroku)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
