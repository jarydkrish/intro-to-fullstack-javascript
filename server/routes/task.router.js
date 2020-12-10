const express = require('express');
const Task = require('../models/task.model');
const router = express.Router();

// GET /tasks/
router.get('/', (req, res) => {
   console.log('GET tasks');
   Task.findAll(
      // configuration option with order key
      { 
         // order needs an array of key/value strings that
         // get translated to SQL ORDER BY commands
         order: [
            ['done', 'DESC'], 
            ['createdAt', 'ASC']
         ]
      })
      .then(tasks => res.send(tasks))
      .catch(error => {
         console.log('Error getting all tasks', error);
         res.sendStatus(500);
      })
});

// POST /tasks/
router.post('/', (req, res) => {
   console.log(`POST request add new task`, req.body.description);

   // grab the description out of HTTP body, default task to not done
   let newTask = Task.build({
      description: req.body.description,
      done: false,
      // id is auto-generated
      // createdAt is auto-generated
      // updatedAt is auto-generated
   });

   // Save to database
   newTask.save()
      // .then((task) => res.sendStatus(200))
      .then(() => res.sendStatus(200))
      .catch(error => {
         console.log('Error saving task', error);
         res.sendStatus(500);
      })
});

// PUT /tasks/:id
router.put('/:id', (req, res) => {
   // grab taskId out of URL and `done` state out of http body
   let taskId = req.params.id;
   let done = req.body.done;
   console.log(`PUT request update task ${taskId}`, req.body);

   // updatedAt is auto-generated
   Task.update({ done: done }, { returning: true, where: { id: taskId } })
      .then(() => res.sendStatus(200))
      .catch(error => {
         console.log('Error updating task status', error);
         res.sendStatus(500);
      })
});

// DELETE /tasks/:id
router.delete('/:id', (req, res) => {
   // grab the task id out of the URL
   let taskId = req.params.id;
   console.log(`DELETE request for task ${taskId}`);
   Task.destroy({ where: { id: taskId } })
      .then(() => res.sendStatus(200))
      .catch(error => {
         console.log('Error deleting task', error);
         res.sendStatus(500);
      })
});

module.exports = router;