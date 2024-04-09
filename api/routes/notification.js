const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const mongoose = require('mongoose');

// Notification
router.get('/notification/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('followRequests').exec();
        if (!user) {
            return res.status(404).json('User not found');
        }
        const followRequests = await User.find({_id: user.followRequests},'id username profilePicture'); 
        return res.status(200).json(followRequests);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;