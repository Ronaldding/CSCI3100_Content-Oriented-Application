const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')

const adminRoute = require('./routes/admin')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const recommendationRoute = require('./routes/recommendation')
const notificationRoute = require('./routes/notification')
dotenv.config()

// mongoose.connect(process.env.MONGO_URL)
mongoose
  .connect('mongodb://127.0.0.1:27017/3100project')
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => console.log(err))

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.use(adminRoute)
app.use(userRoute)
app.use(authRoute)
app.use(postRoute)
app.use(recommendationRoute)
app.use(notificationRoute)

app.listen(8800, () => {
  console.log('Backend server is running!')
})
