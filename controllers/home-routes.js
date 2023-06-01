const router = require('express').Router();
const { User } = require('../models');

// Homepage route
router.get('/', (req, res) => {
  res.render('homepage', {loggedIn: req.session.loggedIn});
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
