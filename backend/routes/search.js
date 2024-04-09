const express = require('express')
const User = require('../models/User')
const router = express.Router()
const validator = require('validator')

router.get('/search/:username', async (req, res) => {
  const { username, query, page = 1, limit = 10 } = req.query

  if (!query) {
    return res.status(400).json({ message: 'Input is required' })
  }

  try {
    const sanitizedQuery = validator.escape(query)
    const regex = new RegExp(sanitizedQuery, 'gi')

    const users = await User.find(
      {
        _username: { $ne: username },
        $or: [{ username: { $regex: regex } }, { email: { $regex: regex } }],
      },
      'username profilePicture'
    )
      .skip((page - 1) * limit)
      .limit(limit)

    const total = await User.countDocuments({
      _id: { $ne: userId },
      $or: [{ username: { $regex: regex } }, { email: { $regex: regex } }],
    })

    res.status(200).json({ total, users })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
