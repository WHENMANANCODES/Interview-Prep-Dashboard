const express = require('express');
const router = express.Router();
const Problem = require('../Models/Problem');
const auth = require('../middleware/auth'); // 1. Apne (middleware) ko bulaya

// GET: Sirf logged-in user ki problems laao
router.get('/', auth, async (req, res) => { // 2. Raste mein auth middleware laga diya
  try {
    // Pehle: Problem.find() -> Saari problems aa jaati thin
    // AB: Sirf wahi problems aayengi jahan user ID tumhari login ID se match karegi!
    const problems = await Problem.find({ user: req.user.id }); 
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Nayi problem ko user ke account ke sath bandho
router.post('/', auth, async (req, res) => { // Raste mein auth middleware lagaya
  console.log("BODY RECEIVED:");
  console.log(req.body);

  const problem = new Problem({
    user: req.user.id, // 3. ASLI KHEL: Model mein user ki Unique ID ka thappa laga diya!
    name: req.body.name,
    level: req.body.level,
    date: req.body.date,
    note: req.body.note,
    topic: req.body.topic,
    sheetProblemId: req.body.sheetProblemId,
    fromSheet: req.body.fromSheet
  });

  try {
    const newProblem = await problem.save();
    res.status(201).json(newProblem);
  } catch (err) {
    console.log("ERROR:");
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Kisi problem ko delete karne se pehle verify karo
router.delete('/:id', auth, async (req, res) => { // Raste mein auth middleware lagaya
  try {
    // Security Check: Pehle dhoondho ki kya yeh problem sach mein isi user ki hai?
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Agar koi doosra user galti se ya hack karke kisi aur ki ID delete karna chahe
    if (problem.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized to delete this problem' });
    }

    await Problem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Problem deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;