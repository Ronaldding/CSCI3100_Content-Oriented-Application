const router = require("express").Router();
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const User = require("../models/User");
const mongoose = require('mongoose');
const cors = require('cors');
router.use(cors());
// const jwt = require('jsonwebtoken')
// const dotenv = require("dotenv");
// dotenv.config();

// http://localhost:8800

// User
// Read all Users
router.get('/admin_manage_user', async (req, res) => { //http://localhost:8800/admin_manage_user
    try {
        const users = await User.find({}, 'id username suspended email password'); // Retrieve only id, suspended, email, password and username fields
        res.status(200).json(users);
    }catch (err) {
        res.status(500).json(err);
    }
}); 

// Read a user
router.get('/admin_manage_user/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...other } = user._doc;
      if (!user) {
        return res.status(404).json('User not found');
      }
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
});

// Delete a user
router.delete('/admin_manage_user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json('User not found');
        }
        // await User.findByIdAndDelete(req.params.id);
        await user.deleteOne();
        res.status(200).json('Account has been deleted');
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Update a user
router.put('/admin_manage_user/:id', async (req, res) => {
    const isEmpty = Object.values(req.body).every(value => !value);
    if (isEmpty) {
      return res.status(400).json('Please fill in at least one field to update');
    }

    if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json('User not found');
        }
        await user.updateOne({ $set: req.body});
        // await User.findByIdAndUpdate(req.params.id, {
        //   $set: req.body,
        // });
        res.status(200).json('Account has been updated');
    } catch (err) {
        return res.status(500).json(err);
    } 
});
 
// Suspend a user
router.put('/admin_manage_user/:id/suspend', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json('User not found');
        }
        user.suspended = true;
        user.suspensionReason = req.body.suspensionReason;
        await user.save();
        res.status(200).json('User has been suspended');
    } catch (err) {
      res.status(500).json(err);
    }
});

// Unsuspend a user
router.put('/admin_manage_user/:id/unsuspend', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json('User not found');
        }
        user.suspended = false;
        user.suspensionReason = "";
        await user.save();
        res.status(200).json('User has been unsuspended');
    } catch (err) {
        res.status(500).json(err);
    }
});


// Post
// Read all post
router.get('/admin_manage_post', async (req, res) => {
    try {
        const posts = await Post.find().populate('username').exec();
        res.status(200).json(posts);
    }catch (err) {
        res.status(500).json(err);
    }
}); 

// Read a post
router.get('/admin_manage_post/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('username').exec();
        if (!post) {
            return res.status(404).json('Post not found');
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a post
router.delete('/admin_manage_post/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json('Post not found');
        }
        // await Post.findByIdAndDelete(req.params.id);
        await post.deleteOne();
        res.status(200).json('Post has been deleted');
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Update a post
router.put('/admin_manage_post/:id', async (req, res) => {
    const isEmpty = Object.values(req.body).every(value => !value);
    if (isEmpty) {
      return res.status(400).json('Please fill in at least one field to update');
    }
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json('Post not found');
        }
        await post.updateOne({ $set: req.body});
        // await Post.findByIdAndUpdate(req.params.id, {
        //   $set: req.body,
        // });
        res.status(200).json('Post has been updated');
    } catch (err) {
        return res.status(500).json(err);
    } 
});

// Hide a post
router.put('/admin_manage_post/:id/hide', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json('Post not found');
        }
        post.isHide = true; 
        await post.save();
        res.status(200).json('The post has been hidden');
    } catch (err) {
      res.status(500).json(err);
    }
});

// Unide a post
router.put('/admin_manage_post/:id/unhide', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json('Post not found');
        }
        post.isHide = false; 
        await post.save();
        res.status(200).json('The post has been unhidden');
    } catch (err) {
      res.status(500).json(err);
    }
});

// Login as admin
// router.post('/login', async (req, res) => {
//     try {
//         const { username, email, password } = req.body;

//         if (username === 'Admin' || email === 'admin@gmail.com'){
//             admin = await User.findOne({ username: 'Admin' });
//             const isValid = await bcrypt.compare(password, admin.password);
//             if (isValid){
//                 admin.isAdmin = true;
//                 await admin.save();
//             }
//         }
//         res.status(200).json(admin);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

module.exports = router;