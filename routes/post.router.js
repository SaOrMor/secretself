const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/post.model");
const Comment = require("../models/comments.model");
const User = require("../models/user.model");


const router = express.Router();
const createError = require("http-errors");



const {
    isLoggedIn,
    IsUser,
    isComm,
} = require("../helpers/middlewares");

// api/post      POST        create new post

router.post('/post', isLoggedIn,  (req, res, next) => {

// get valus to create the post

const { text, image} = req.body;

const currentUser = req.session.currentUser;

// create the post

Post.create({ text, image, user: currentUser}) //comments: [] maybe currentUser should be currentUser._id
.then((createdPost) => {
    res.status(201).json(createdPost)
// update the user model post key with the created post Id;

const pr = User.findByIdAndUpdate(currentUser._id, {$push: {post: createdPost._id} })
return pr
 
})

.then((updatedUser) => {
  
 })
 .catch((err)=>{
  res.status(500).json(err)
})})

// api/post/:id        PUT       edit the post

// runs only the second time, maybe we can fix it with the ternary operetor, 
// this.state.text ? this.state.text : null, because the value is not available now
// you have to add a function that check if you are the one who created it

router.put('/post/:id', isLoggedIn,(req, res, next) => {

const {id} = req.params;

const {text, image} = req.body;

console.log("req.body", req.body)

Post.findByIdAndUpdate(id, {text,  image}, {new: true})


.then((editedPost) => {
    res.status(200).json(editedPost)
}).catch((err) => {
    res.status(500).json(err)
})


})


//  api/post/:id       GET       get one post
// you have to add a function that check if you are the one who created it


router.get('/post/:id', isLoggedIn, (req, res, next) => {

    const {id} = req.params;

     Post.findById(id)
     .populate('comments')
    .then((foundPost) => {
        res.status(200).json(foundPost)

    }).catch((err) => {
        console.log(err)
        res.status(500).json(err)
    })
})

// api/post/:id       DELETE      delete one post
// you have to add a function that check if you are the one who created it
// check the json that you are sending here, it's strange;


router.delete('/post/:id',isLoggedIn, (req, res, next) => {

const {id} = req.params;

Post.findByIdAndDelete(id)
.then((deletedPost) => {
    res.status(204).json(deletedPost)
}).catch((err) => {
    res.status(500).json(err)
})

})

// api/post           GET        get all the post

router.get('/post', (req, res, next) => {

    Post.find()
    
    .then((foundPosts) => {
        res.status(200).json(foundPosts)
    }).catch((err) => {
        res.status(500).json(err)
    })
    })



// api/post/:id/comment        POST      create a comment



router.post('/post/:id/comment', isLoggedIn, (req, res, next) => {

    const currentUser = req.session.currentUser;
    const {id} = req.params;
    const {cText, date} = req.body;
    

    //CREATE COMMENT
    Comment.create({cText, date, post: id, user: currentUser})
    .then(( createdComment) => {
        res.status(201).json(createdComment)
    // PUSH ID COMMENT TO POST.COMMENT

      Post.findByIdAndUpdate(id, {$push: {comments: createdComment._id} }).then((pr)=>{
          console.log("pr", pr)
      }).catch((err) => {console.log("findByIdAndUpdate error")})
     
     
    }).catch((err) => {
        res.status(500).json(err)


    })
    })


// api/post/:id/comments/:id          PUT      edit a comment
// same problem with the first put route, runs only the second time
// check and study this well

/*  router.put('/post/comments/:id', isLoggedIn,  (req, res, next) => {

    const {id} = req.params;

    const {cText, image} = req.body;

            Comment.findByIdAndUpdate(id, {cText, image})

            .then((updComm)=> {
                res.status(201).json(updComm)
           
            }).catch((err) => {
                res.status(500).json(err)
            })


        console.log(Comment.user, "comment.user")
        })
        
        */
    
    router.put('/post/comments/:id', isLoggedIn, (req, res, next) => {

    const {id} = req.params;

    const {cText, image} = req.body;

    const currentUser = req.session.currentUser;

    // let editComm;

    Comment.findById(id).then((foundComm) => {


        
        if (foundComm.user == currentUser._id) {

            Comment.findByIdAndUpdate(id, {cText, image}, {new: true})
  
              .then((updComm) => { res.status(200).json(updComm) })
  
              .catch((err) => {res.status(500).json(err)})
           } else {
               console.log("fals")
               console.log(typeof foundComm.user)
               console.log(typeof currentUser._id)
           }


    })

    })



    





// api/post/:id/comments/:id       DELETE    delete a comment

router.delete('/post/comments/:id', (req, res, next) => {

const {id} = req.params;

Comment.findByIdAndDelete(id).then((deletedComm) => {
    res.status(204).json(deletedComm)
}).catch((err) => {
    res.status(500).json(err)
})

})



//  api/post/:id/comments    GET    get all the comments
/*

router.get('/post/comments', (req, res, next) => {
    Comment.find()
    .then((foundComm) => {
        res.status(200).json(foundComm)
    }).catch((err) => {
        res.status(500).json(err)
    })
})
*/

 router.get('/post/comments/:id', (req, res, next) => {
    
    const {id} = req.params;

    Post.findById(id)
    .populate( "comments" )
    .then((foundPost) => {
    res.status(200).json(foundPost)
    }).catch((err) => {
        res.status(500).json(err)
    })
})



module.exports = router;