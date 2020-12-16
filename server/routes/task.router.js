const express = require('express');
const Task = require('../models/task.model');
const router = express.Router();

// GET /tasks/
router.get('/', (req, res) => {
   // TODO: Get a list of all tasks and send to the browser with 200 OK
   res.sendStatus(500);
});

// POST /tasks/
router.post('/', (req, res) => {
   // TODO: Build a new task model, save it, and send back 201 CREATED
   res.sendStatus(500);
});

// PUT /tasks/:id
router.put('/:id', (req, res) => {
   // TODO: Update a task status, save it, and send back 204 NO CONTENT
   res.sendStatus(500);
});

// DELETE /tasks/:id
router.delete('/:id', (req, res) => {
   // TODO: Delete a task and send back 204 NO CONTENT
   res.sendStatus(500);
});

module.exports = router;