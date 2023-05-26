const asyncHandler = require('express-async-handler');
const { User } = require('../models/userModel.js');
const generateToken = require('../utils/generateToken.js');

// @desc- Auth User & set token
// @route- POST /api/users/auth
// @access- Public
const authUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Auth User'});
});

// @desc- Register a new user
// @route- POST /api/users
// @access- Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //Check if user already exists
    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400);
        throw new Error('User already exists')
    }

    //If user does not exist, create new user 
    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
});

// @desc- Logout user
// @route- POST /api/users/logout
// @access- Public
const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Logout User'});
});

// @desc- Get user profile
// @route- GET /api/users/profile
// @access- Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'User Profile'});
});

// @desc- Update user profile
// @route- PUT /api/users/profile
// @access- Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Update user profile'});
});

module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};