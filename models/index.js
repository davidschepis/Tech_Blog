const User = require('./User');
const Comment = require('./Comment');
const BlogPost = require('./BlogPost');

User.hasMany(BlogPost, {
    foreignKey: 'creator_id',
});

BlogPost.belongsTo(User, {
    foreignKey: 'creator_id',
});

BlogPost.hasMany(Comment, {
    foreignKey: 'blogPost_id',
});

Comment.belongsTo(BlogPost, {
    foreignKey: 'blogPost_id',
});


module.exports = { User, Comment, BlogPost };
