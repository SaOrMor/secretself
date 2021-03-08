const createError = require("http-errors");
const { post } = require("../app");
const Post = require("../models/post.model");
const Comment = require("../models/comments.model")

exports.isLoggedIn = (req, res, next) => {
  // Check if user request has a cookie/session.
  if (req.session.currentUser) next();
  else next(createError(401));
};

exports.isNotLoggedIn = (req, res, next) => {
  // Check if the user request came without a cookie and isn't logged in
  if ( ! req.session.currentUser ) next();
  else next( createError(403) );   // new Error({message: '', statusCode: 403})
};



exports.IsUser = (req, res, next) => {
  // check if the current user is the same as the one who created the post
  if ( req.session.currentUser._id === Post.user) next();
  else next(createError(401));
};

exports.isComm = (req, res, next) => {
  // check if the current user is the same as the one who created the comment
  if ( req.session.currentUser._id === Comment.user) next();
  else next(createError(401));
};


exports.validationLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password){
    next(createError(400));
  } 
  else next();
};




// Above exporting is same as what we did before:
// exports = {
//   isLoggedIn,
//   isNotLoggedIn,
//   validationLogin,
// }