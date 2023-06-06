const router = require('express').Router();
const { User, Post, Profile } = require('../models');
const withAuth = require('../utils/auth');

// Homepage route
router.get('/', async (req, res) => {
  try {
      const dbPostData = await Post.findAll({ 
          attributes: ['id', 'title', 'summary', 'reqs', 'location', 'salary', 'applyLink'],           
          order: [['created_at', 'DESC']],
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

// Logout 
router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
  });
    return;
  }
  res.render('homepage');
});

// Profile route
router.get('/profile', withAuth, async (req, res) => {
  try {
    const profData = await User.findByPk(req.session.id, {
      attributes: {exclude: ['password']}, 
      include: [{ model: Profile }],
    })

    const profile = profData.get({ plain: true});

  res.render('profile', { 
    ...profile, 
    loggedIn: req.session.loggedIn 
  });
  } catch (err) {
    res.status(500).json(err);
  }
});

// New Job Post route
router.get('/newpost', (req, res) => {
  res.render('newpost',  { loggedIn: req.session.loggedIn });
});

// Get single post
router.get('/post/:id', async (req, res) => {
  try{
      const dbPostData = await Post.findOne({
          where: {id: req.params.id},
          attributes: ['id', 'title', 'summary', 'reqs', 'location', 'salary', 'applyLink'],
          include: [
                {
                  model: User,
                  attributes: ['name'],
                },
          ],
      });
      if (dbPostData) {
          const post = dbPostData.get({ plain: true });

          res.render('single-post', { post, loggedIn: req.session.loggedIn })  
      } else {
          res.status(404).json({ message: "Error finding post..."});
          return;
      }
  } catch (err) {
      res.status(500).json(err);
  }   
});

module.exports = router;