const express = require('express');
const router = express.Router();
const Problem = require('../Models/Problem');

// GET all problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new problem
router.post('/', async (req, res) => {
  const problem = new Problem({
    name: req.body.name,
    level: req.body.level,
    date: req.body.date,
    note: req.body.note
  });

  try {
    const newProblem = await problem.save();
    res.status(201).json(newProblem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE problem
router.delete('/:id', async (req, res) => {
  try {
    await Problem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Problem deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;