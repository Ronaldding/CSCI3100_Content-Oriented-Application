const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')
const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')
// const dotenv = require("dotenv");
// dotenv.config();

// User recommendation
router.get('/userExplore/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('followings')

    let scores = []

    for (let following of user.followings) {
      const userFollowings = await User.findById(following).populate(
        'followings'
      )
      for (let f of userFollowings.followings) {
        if (!user.followings.includes(f) && !user._id.equals(f)) {
          scores[f] = (scores[f] || 0) + 1
        }
      }
    }

    // Only top 10 recommendations
    let recommendedUserIds = Object.keys(scores)
      .sort((i, j) => recommendationScores[j] - scores[i])
      .slice(0, 10)

    const recommendedUsers = await User.find({
      _id: { $in: recommendedUserIds },
    })
    res.status(200).json(recommendedUsers)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Content recommendation
router.get('/contentExplore', async (req, res) => {
  try {
    const likes = await Post.find({
      likes: mongoose.Types.ObjectId(req.params.userId),
    })
    let scores = {}

    userLikes.forEach((post) => {
      post.tags.forEach((tag) => {
        scores[tag] = (scores[tag] || 0) + 1
      })
    })

    // Sort by newest and only 10 recommendations
    const recommendedPosts = await Post.find({
      tags: { $in: Object.keys(scores) },
      _id: { $nin: userLikes.map((post) => post._id) },
    })
      .sort({ createdAt: -1 })
      .limit(10)

    res.status(200).json(recommendedPosts)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
