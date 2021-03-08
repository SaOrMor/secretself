const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require("./comments.model");
const User = require("./user.model")

const postSchema = new Schema ({
    text: String,
    image: String,
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment"}],
    user: { type: Schema.Types.ObjectId, ref: "User"}
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;