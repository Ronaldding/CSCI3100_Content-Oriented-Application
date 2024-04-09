const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');
router.use(cors());
const cookieParser = require('cookie-parser');


// register
// register
router.post('/register', async (req, res) => {
  try {
    // Check if email already exists
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username: req.body.username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    // Save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

let refreshTokens = []
//LOGIN


 /* router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      
      if(!user) {
        throw "User not found"; 
      }
  
      const isValid = await bcrypt.compare(req.body.password, user.password);
  
      if(!isValid) {
        throw "Invalid password";
      }

      //return res.status(200).json(user);
  
    } catch (err) {
      return res.status(400).json(err);
    }
  });*/

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user;
    if (username) {
      user = await User.findOne({ username });
    } else if (email) {
      user = await User.findOne({ email });
    } else {
      throw 'Username or email is required';
    }

    if (!user) {
      throw 'User not found';
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw 'Invalid password';
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.cookie('myCookie', 'cookieValue', { maxAge: 900000, httpOnly: true });
    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    res.status(400).json(err);
  }
});


router.get('/login/:username', async (req, res) => {
  try {
    const username = req.params.username
    const user = await User.findOne({username});
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

  //get a user
  router.get('/user-profile', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    console.log(userId)
    try {
      const user = await User.findOne({ userId }); // Use findOne to find a single document
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //generate token
  router.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({ name: user.name })
      res.json({ accessToken: accessToken })
    })
  })

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

function generateAccessToken(user) {
  return jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h'
  });
}

module.exports = router;