const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./user.model")
const Post = require("./post.model")



const commentSchema = new Schema({
    cText: String,
    date: Date,
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    user: { type: Schema.Types.ObjectId, ref: "User"}
})

const Comment = mongoose.model("Comments", commentSchema);

module.exports = Comment;