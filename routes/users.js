const express = require('express');
const router = express.Router();
const auth = require('../auth'); // auth 모듈 추가

// POST register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await auth.registerUser(username, password);
    res.json({ message: result.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await auth.loginUser(username, password);
    res.json({ token: token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Logout route
router.get('/logout', function(req, res) {
  req.session.destroy(() => {
    res.redirect('/');
  });
});


module.exports = router;
