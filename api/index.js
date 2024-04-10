const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const cloudinary = require('cloudinary').v2
const multer = require("multer");
const path = require("path");
const cors = require('cors');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

const adminRoute = require('./routes/admin')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const recommendationRoute = require('./routes/recommendation')
const notificationRoute = require('./routes/notification')
dotenv.config()
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000'
}));
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

app.use("/images", express.static(path.join(__dirname, "material/images")));//images
app.use("/videos", express.static(path.join(__dirname, "material/videos")));//video


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "material/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);//req.body.name
  },
});
const upload = multer({ storage: storage });
app.post("/upload/images", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded success");
  } catch (error) {
    return res.status(500).json({ message: "Error occurred while uploading the file." });
  }
});


const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "material/videos"); 
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name); //req.body.name
  },
});
const videoUpload = multer({ storage: videoStorage });

app.post("/upload/videos", videoUpload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error occurred while uploading the file." });
  }
});


app.use(adminRoute)
app.use(userRoute)
app.use(authRoute)
app.use(postRoute)
app.use(recommendationRoute)
app.use(notificationRoute)

app.listen(8800, () => {
  console.log('Backend server is running!')
})
