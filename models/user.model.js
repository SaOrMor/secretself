const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require("./comments.model");
const Post = require("./post.model")

const userSchema = new Schema({
  email: String,
  password: String,
  post: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});


const User = mongoose.model('User', userSchema);

module.exports = User;