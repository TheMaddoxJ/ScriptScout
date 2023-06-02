const router = require('express').Router();
const { User, Post } = require('../models');

// Homepage route
router.get('/', async (req, res) => {
  try {
      const dbPostData = await Post.findAll({ 
          attributes: ['id', 'title', 'content', 'location', 'salary'],           
          // order: [['created_at', 'DESC']],
      })

      // Serialize data retrieved
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render('homepage', 
          { posts, 
          loggedIn: req.session.loggedIn, 
          username: req.session.name
          });
  } catch (err) {
      res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

//Logout 
router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
  });
    return;
  }
  res.render('homepage');
});

module.exports = router;
