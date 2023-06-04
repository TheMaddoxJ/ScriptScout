const User = require('./user');
const Post = require('./post');
const Profile = require('./profile');

// Associations

// User has many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
    });

// User has one profile

User.hasOne(Profile, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
    });

// Posts only belong to one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
    });


// Profile only belong to one user

Profile.belongsTo(User, {
    foreignKey: 'user_id'
    });

module.exports = {
    User,
    Post,
    Profile,
};
