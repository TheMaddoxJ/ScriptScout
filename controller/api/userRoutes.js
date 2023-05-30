const express = require('express');
const router = express.Router();
const { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile 
} = require('../userController');

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile').get(getUserProfile).put(updateUserProfile);

module.exports = router;