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
const bodyParser = require('body-parser');

// Route includes
const taskRouter = require('./routes/task.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Routes */
app.use('/tasks', taskRouter);

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
