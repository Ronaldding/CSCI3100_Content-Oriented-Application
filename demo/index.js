const express = require('express');
const app = express();
const mongoose = require("mongoose");

const adminRoute = require("./admin");
const recommendationRoute = require("./recommendation");
const notificationRoute = require("./notification")

mongoose.connect('mongodb://127.0.0.1:27017/3100project')
  .then(() => {
    console.log('Connected to MongoDB'); 
  })
  .catch(err => console.log(err));

app.use(express.json());
app.use(adminRoute);
app.use(recommendationRoute);
app.use(notificationRoute);

app.listen(8800, () => {
    console.log("Backend server is running!");
  });