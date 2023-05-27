const router = require('express').Router();
const { User } = require('../models');

// Homepage route
router.get('/', (req, res) => {
  res.render('homepage');
});





// COMMENTED OUT FOR NOW TO INPUT JOB LIST ON HOMEPAGE
// // Login route
// router.get('/login', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }
//   res.render('login');
// });

module.exports = router;
