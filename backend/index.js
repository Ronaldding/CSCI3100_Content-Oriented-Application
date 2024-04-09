const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const PORT = process.env.PORT

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors())
app.use(bodyParser.json())

app.use(express.json())

mongoose
  .connect('mongodb://127.0.0.1:27017/3100project')
  .then(() => {
    console.log('Connected to MongoDB...')
  })
  .catch((err) => console.log('Could not connect to Mongodb...', err))

const adminRoute = require('./routes/admin')
const recommendationRoute = require('./routes/recommendation')
const notificationRoute = require('./routes/notification')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const searchRoute = require('./routes/search')

app.use('/admin', adminRoute)
app.use('/recommendation', recommendationRoute)
app.use('/notification', notificationRoute)
app.use('/users', userRoute)
app.use('/auth', authRoute)
app.use('/posts', postRoute)
app.use('/search', searchRoute)

app.listen(PORT, () => {
  console.log('Backend server is running!')
})
