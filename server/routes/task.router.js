const express = require('express');
const Task = require('../models/task.model');
const router = express.Router();

router.get('/', (req, res) => {
   console.log('GET tasks');
   Task.findAll().then(tasks => {
      res.send(tasks);
   }).catch(error => {
      console.log('Error getting all tasks', error);
      res.sendStatus(500);
   })
});

router.post('/', (req, res) => {
   console.log(`POST request add new task`, req.body.description);

   let newTask = Task.build({
      description: req.body.description,
      done: false, // default to not being done yet
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

router.put('/:id', (req, res) => {
   let taskId = req.params.id;
   let done = req.body.done;
   console.log(`PUT request update task ${taskId}`, req.body);
   Task.update({ done: done }, { returning: true, where: { id: taskId } })
      .then(() => res.sendStatus(200))
      .catch(error => {
         console.log('Error updating task status', error);
         res.sendStatus(500);
      })
});

router.delete('/:id', (req, res) => {
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