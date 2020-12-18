const express = require('express');
const Task = require('../models/task.model');
const router = express.Router();

// GET /tasks/
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.send(tasks);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// POST /tasks/
router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).send(task);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// PUT /tasks/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id } });
    if (!task) {
      res.sendStatus(404);
      return;
    }
    const updatedTask = await task.update(req.body);
    res.send(updatedTask);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id } });
    if (!task) {
      res.sendStatus(404);
      return;
    }
    await task.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
