const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')
const cors = require('cors')
router.use(cors())
//create a post

router.post('/post', async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
  } catch (err) {
    res.status(500).json(err)
  }
})
//update a post

router.put('/post/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const user = await User.findById(req.body.userId)
    if (post.userId === req.body.userId || user.isAdmin) {
      //owner of the post
      await post.updateOne({ $set: req.body })
      res.status(200).json('Post has been updated')
    } else {
      res.status(403).json('You can update only your post')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//delete a post
router.delete('/post/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const user = await User.findById(req.body.userId)

    if (!post) {
      return res.status(404).json('Post not found')
    }

    if (post.userId === req.body.userId || user.isAdmin) {
      // Check if the user is the owner of the post or an admin
      await post.deleteOne()
      res.status(200).json('Post has been deleted')
    } else {
      res
        .status(403)
        .json('You can delete only your post or you need admin privileges')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})
// Hide / Unhide a post
router.put('/post/:id/hide', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const user = await User.findById(req.body.userId)

    if (!post) {
      return res.status(404).json('Post not found')
    }

    if (!user.isAdmin) {
      return res.status(403).json('Only admin can hide/unhide posts')
    }

    post.isHide = !post.isHide // Toggle the value of isHide property
    await post.save()

    if (post.isHide) {
      res.status(200).json('The post has been hidden')
    } else {
      res.status(200).json('The post has been unhidden')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})
//like / dislike a post

router.put('/post/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } })
      res.status(200).json('The post has been liked')
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } })
      res.status(200).json('The post has been disliked')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})
//get a post

router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
})

//get timeline posts by userid

router.get('/post/timeline/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId)
    const userPosts = await Post.find({ userId: currentUser._id })
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId })
      })
    )
    res.status(200).json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err)
  }
})
// get all timeline posts
router.get('/post/all/timeline', async (req, res) => {
  try {
    const publicUsers = await User.find({ isPublic: true })
    const publicUserIds = publicUsers.map((user) => user._id)

    const timelinePosts = await Post.find({
      userId: { $in: publicUserIds },
      isHide: false,
    })
    res.status(200).json(timelinePosts)
  } catch (err) {
    res.status(500).json(err)
  }
})
//get user profile post by userid

router.get('/post/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const posts = await Post.find({ userId: user._id })
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json(err)
  }
})

// add comment to a post
router.post('/post/:id/comment', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const user = await User.findById(req.body.userId)

    if (!post) {
      return res.status(404).json('Post not found')
    }

    const newComment = {
      userId: user._id,
      comment: req.body.comment,
    }

    post.comments.push(newComment)
    await post.save()

    res.status(200).json('Comment added successfully')
  } catch (err) {
    res.status(500).json(err)
  }
})
// Search posts by tags
router.get('/post/search/tags', async (req, res) => {
  try {
    const tags = req.query.tags.split(',') //http://localhost:8800/api/posts/search/tags?tags=tag1,tag2
    const posts = await Post.find({ tags: { $all: tags } })

    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: 'No posts found for the specified tags.' })
    }

    res.status(200).json(posts)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'An error occurred while searching for posts.' })
  }
})

// Save or unsave a post
router.put('/post/:id/save', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const user = await User.findById(req.body.userId)

    if (!post) {
      return res.status(404).json('Post not found')
    }

    const savedIndex = user.savedPosts.indexOf(post._id)

    if (savedIndex === -1) {
      // Post is not saved, so save it
      user.savedPosts.push(post._id)
      await user.save()
      res.status(200).json('Post has been saved')
    } else {
      // Post is already saved, so unsave it
      user.savedPosts.splice(savedIndex, 1)
      await user.save()
      res.status(200).json('Post has been unsaved')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
