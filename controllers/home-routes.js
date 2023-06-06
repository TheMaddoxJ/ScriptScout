const router = require('express').Router();
const { User, Post } = require('../models');
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

// Get user profile
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: ['id'],
    });
    const user = userData.get({ plain: true });
    res.render('profile', {
      ...user, 
      req: req.session,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// // edit user profile info ('/edit') TODO - NOT WORKING YET
// router.put('/edit', withAuth, async (req, res) => {
//   try {
//     const updatedProfile = await User.update(
//       {
//         jobTitle: req.body.jobTitle,
//         location: req.body.location,
//         aboutMe: req.body.aboutMe
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     );
//     if (!updatedProfile) {
//       res.status(404).json({ message: 'Error finding user profile information' });
//       return;
//     }  
//     res.status(200).json(updatedProfile);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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