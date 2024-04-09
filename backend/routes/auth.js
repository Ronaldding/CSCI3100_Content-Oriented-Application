const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// Register a new user
router.post('/', async (req, res) => {
  const registeredEmailAccount = await User.findOne({
    email: req.body.email,
  })

  const existingUsername = await User.findOne({
    username: req.body.username,
  })

  if (!registeredEmailAccount && !existingUsername) {
    try {
      //Encrypt new password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)

      // create new user
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        isRegistered: req.body.isRegistered,
        isConfirmed: true,
      })

      const user = await newUser.save()
      res.status(200).json(user)
    } catch (err) {
      res.json({ message: err })
    }

    // Email and password validation
    const emailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const passwordFormat = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@.#$!%*?&^])[A-Za-zd@.#$!%*?&]{8,15}$'
    )
    if (req.body.email !== '' && !req.body.email.match(emailFormat)) {
      return res.status(401).json('Invalid email')
    }
    if (req.body.password !== '' && !req.body.password.match(passwordFormat)) {
      return res.status(401).json('Invalid password')
    }
  } else {
    if (registeredEmailAccount.length) {
      // Email is already registered
      return res.status(400).json('Email is already registered.')
    }
  }
})

// Login
router.post('/login', async (req, res) => {
  const userEmail = await User.findOne({ email: req.body.email })
  const userName = await User.findOne({ username: req.body.username })

  if (!userEmail) {
    res.status(400).send('Incorrect email')
  } else if (!userName) {
    res.status(400).send('Incorrect username')
  } else if (bcrypt.compare(req.body.password, account.password)) {
    // Login successfully
    const accessToken = generateAccessToken(user.email)
    const refreshToken = JWT.sign(account.email, process.env.REFRESH_TOEKN)
    refreshTokens.push(refreshToken)
    res.status(200).json({
      userId: account.userId,
      username: account.username,
      isAdmin: account.isAdmin,
      isPublic: account.isPublic,
      accessToken: accessToken,
      refreshToken: refreshToken,
      userProfilePicture: account.profilePicture,
    })
  } else {
    res.status(404).send()
  }
})

// Forgot Password
router.patch('/password/', async (req, res) => {
  try {
    const account = await User.findOne({
      email: req.body.email,
    })
    if (!account) {
      return res.status(404).send('User does not exist.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    await User.updateOne(
      {
        userId: req.body.userId,
      },
      { $set: { password: hashedPassword } }
    )
    res.status(200).send('Reset password successfully!.')
  } catch (err) {
    res.status(500).send('Error')
  }
})

let refreshTokens = []

router.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOEKN, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ username: user })
    res.json({ accessToken: accessToken })
  })
})

function generateAccessToken(user) {
  return JWT.sign(
    { username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1h',
    }
  )
}

module.exports = router
