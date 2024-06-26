const dotenv = require('dotenv')
dotenv.config()
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})
const User = require('../models/User')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const cors = require('cors')
router.use(cors())

// Update User
router.put('/user/:id', async (req, res) => {
  const { id } = req.params
  const { userId } = req.body

  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json('User not found')
    }

    if (userId === id || user.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10)
          req.body.password = await bcrypt.hash(req.body.password, salt)
        } catch (err) {
          return res.status(500).json(err)
        }
      }

      try {
        await User.findByIdAndUpdate(id, { $set: req.body })
        return res.status(200).json('Account has been updated')
      } catch (err) {
        return res.status(500).json(err)
      }
    } else {
      return res
        .status(403)
        .json('You can update only your account or you must be an admin')
    }
  } catch (err) {
    return res.status(500).json(err)
  }
})

// Update User Profile Picture
router.put('/user/picture/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)
    const profilePictureURL = req.body.profilePicture

    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    if (!req.body.profilePicture) {
      return res.status(400).json({ message: 'No image file uploaded.' })
    }

    // Delete the previous profile picture from Cloudinary if needed
    if (user.profilePicture) {
      const publicId = user.profilePicture.split('/').pop().split('.')[0]
      await cloudinary.uploader.destroy(publicId)
    }

    // Update the user's profile picture with the new Cloudinary URL
    const image = await cloudinary.uploader.upload(profilePictureURL, {
      upload_preset: 'unsigned_upload_users',
      public_id: `${userId}_profilePicture`,
      allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'ico', 'webp'],
    })

    user.profilePicture = image.url
    await user.save()

    res.status(200).json({
      message: 'Profile picture updated successfully.',
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: 'An error occurred while updating the profile picture.',
    })
  }
})

// Delete User
router.delete('/user/:id', async (req, res) => {
  const { id } = req.params
  const { userId } = req.body

  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json('User not found')
    }

    if (userId === id || user.isAdmin) {
      await User.findByIdAndDelete(id)
      return res.status(200).json('Account has been deleted')
    } else {
      return res
        .status(403)
        .json('You can delete only your account or you must be an admin')
    }
  } catch (err) {
    return res.status(500).json(err)
  }
})

//get a user
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, updatedAt, ...other } = user._doc
    res.status(200).json(other)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Follow a user
router.put('/user/:id/follow', async (req, res) => {
  const { userId } = req.body
  const { id } = req.params

  if (userId !== id) {
    try {
      const user = await User.findById(id)
      const currentUser = await User.findById(userId)

      if (!user.followers.includes(userId)) {
        if (user.isPublic) {
          // If the account is public, follow the user directly
          await user.updateOne({ $push: { followers: userId } })
          await currentUser.updateOne({ $push: { followings: id } })
          res.status(200).json('User has been followed')
        } else {
          // If the account is private, send a follow request
          if (!user.followRequests.includes(userId)) {
            // Check if the user has already sent a follow request
            await user.updateOne({ $push: { followRequests: userId } })
            res.status(200).json('Follow request sent')
          } else {
            res.status(403).json('You have already sent a follow request')
          }
        }
      } else {
        res.status(403).json('You already follow this user')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json("You can't follow yourself")
  }
})

// Accept follower request
router.put('/user/:id/accept-follower', async (req, res) => {
  const { followerId } = req.body
  const { id } = req.params

  try {
    const user = await User.findById(id)

    if (user.followRequests.includes(followerId)) {
      // Remove followerId from followRequests array
      user.followRequests = user.followRequests.filter(
        (request) => request.toString() !== followerId
      )

      // Add followerId to followers array
      user.followers.push(followerId)

      await user.save()

      res.status(200).json('Follower request accepted')
    } else {
      res.status(404).json('Follower request not found')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})
//unfollow a user

router.put('/user/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } })
        await currentUser.updateOne({ $pull: { followings: req.params.id } })
        res.status(200).json('user has been unfollowed')
      } else {
        res.status(403).json('you dont follow this user')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json('you cant unfollow yourself')
  }
})
// Block a user
router.put('/user/:id/block', async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const userToBlock = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (!userToBlock.blockedUsers.includes(req.body.userId)) {
        await userToBlock.updateOne({
          $push: { blockedUsers: req.body.userId },
        })
        res.status(200).json('User has been blocked')
      } else {
        res.status(403).json('You have already blocked this user')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json('You cannot block yourself')
  }
})

// Unblock a user
router.put('/user/:id/unblock', async (req, res) => {
  try {
    const userToUnblock = await User.findById(req.params.id)
    const currentUser = await User.findById(req.body.userId)
    if (userToUnblock.blockedUsers.includes(req.body.userId)) {
      await userToUnblock.updateOne({
        $pull: { blockedUsers: req.body.userId },
      })
      res.status(200).json('User has been unblocked')
    } else {
      res.status(403).json('You have not blocked this user')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})
// Set account as public or not
router.put('/user/:id/public', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json('User not found')
    }

    const { isPublic } = req.body

    user.isPublic = isPublic
    await user.save()

    if (isPublic) {
      res.status(200).json('Account has been set as public')
    } else {
      res.status(200).json('Account has been set as private')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})
// Suspend a user
router.put('/user/:id/suspend', async (req, res) => {
  try {
    const adminUser = await User.findById(req.body.userId)
    if (!adminUser) {
      return res.status(404).json('Admin user not found')
    }

    if (adminUser.isAdmin) {
      const user = await User.findById(req.params.id)
      if (!user) {
        return res.status(404).json('User not found')
      }

      user.suspended = req.body.suspended
      user.suspensionReason = req.body.suspensionReason
      await user.save()

      res.status(200).json('User has been suspended')
    } else {
      res.status(403).json('Only admins can suspend users')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})
// Unsuspend a user
router.put('/user/:id/unsuspend', async (req, res) => {
  try {
    const adminUser = await User.findById(req.body.userId)
    if (!adminUser) {
      return res.status(404).json('Admin user not found')
    }

    if (adminUser.isAdmin) {
      const user = await User.findById(req.params.id)
      if (!user) {
        return res.status(404).json('User not found')
      }

      user.suspended = false
      user.suspensionReason = ''
      await user.save()

      res.status(200).json('User has been unsuspended')
    } else {
      res.status(403).json('Only admins can unsuspend users')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})
//search user by username(partial matches) or email (100% match)
router.get('/search/user/', async (req, res) => {
  //http://localhost:8800/search/user?q=email/username
  try {
    const searchQuery = req.query.q
    if (!searchQuery) {
      return res.status(400).json({ message: 'No search query provided.' })
    }
    const usernameRegex = new RegExp(`^${searchQuery}`, 'i')
    const users = await User.find({
      $or: [{ username: { $regex: usernameRegex } }, { email: searchQuery }],
    })
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: 'No users found matching the search query.' })
    }
    res.status(200).json(users)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: 'Error occurred while searching for users.',
      error: err.message,
    })
  }
})
module.exports = router
