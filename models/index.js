const User = require('./user');
const Post = require('./post');

// Associations

// User has many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
    });

// Posts only belong to one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
    });

module.exports = {
    User,
    Post
};
