const express = require('express');
require('dotenv').config();

//////////////////// Set up our database ORM :) ////////////////////
// Database init - create Tables if not there. Migration files are better but this works for now.
const Task = require('./models/task.model');

// if we dont await for the each .sync(), subsequent dependent .sync() calls may 
// crash initially  because the earlier tables are not done being created. 
// this is an anonymous async arrow function that just gets immediately invoked then discarded
(async () => await Task.sync())();

////////////////////// Standard Express Set up //////////////////////
const app = express();
const bodyParser = require('body-parser'); // makes http body available on req.body

// Route includes
const taskRouter = require('./routes/task.router');

// Body parser middleware
app.use(bodyParser.json()); // enables accepting content-type application/json
app.use(bodyParser.urlencoded({ extended: true })); // enables accepting content-type x-www-form-urlencoded

// Routes
app.use('/tasks', taskRouter); // route all requests to /tasks/* to the taskRouter

// Listen on port 5000 unless PORT is in environment vars
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
