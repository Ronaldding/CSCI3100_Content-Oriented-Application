const mongoose = require('mongoose');

 // Define User Schema
const UserSchema = mongoose.Schema({
    userId: {
        type: String,
        // unique: true,
        required: true,
    },
    // username: {
    //     type: String,
    //     required: true,
    //     min: 6,
    //     max: 15
    // },
    email:{
        type: String,
        required: true,
        unique: true
    },
    // password: {
    //     type: String,
    //     required: true,
    //     min: 8
    // },
    profilePicture:{
        type: String,
        default: ''

    },
    followers:{
        type: Array,
        default:[]
    },
    followings:{
        type: Array,
        default:[]
    },
    birthday:{
        type: Date,
        default:''
    },
    description:{
        type: String,
        max: 100
    },
    relationship:{
        type: Array,
        default:[]
    },
    Post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post",
    }],
    // isAdmin:{
    //     type: Boolean,
    //     default: false,
    // }
});

// Define User Model
const User = mongoose.model("User", UserSchema);

module.exports = User;