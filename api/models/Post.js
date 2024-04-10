const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    video: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    isHide: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String], 
      default: [],
    },
    comments: [
      {
        userId: {
          type: String,
          required: true,
        },
        username: { // Add this field for the username
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    retweets: [
      {
        originalPostId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);