const router = require("express").Router();
const Post = require("./Post");
const User = require("./User");
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken')
// const dotenv = require("dotenv");
// dotenv.config();

// User recommendation
router.get('/userExplore/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const userFollowings = user.followings;
        if (userFollowings.length > 0){
            const followingsFollowings = await User.find({_id: { $in: userFollowings} }).distinct('followings');
            if (followingsFollowings.length > 0){
                const userRecommend = await User.find({ _id: { $in: followingsFollowings} })
                return res.status(200).json(userRecommend);
            } else {
                const publicRecommend = await User.find({_id: { $ne: '660970232846199a041ae117'}, isPublic: true });
                return res.status(200).json(publicRecommend);
            }
        } else {
            const publicRecommend = await User.find({_id: { $ne: '660970232846199a041ae117'}, isPublic: true });
            return res.status(200).json(publicRecommend);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
    

// Content recommendation
router.get('/contentExplore', async (req, res) => {
    try {
        const publicUserIds = await User.find({ isPublic: true }).distinct('_id');
        const postRecommend = await Post.aggregate([
            { $match: { isHide: false, userId: { $in: publicUserIds.map(id => id.toString()) } } },
            { $addFields: { numlikes: { $size: '$likes' } } },
            { $sort: { numlikes: -1 } },
        ])
        res.status(200).json(postRecommend);
    } catch (err) {
        res.status(500).json(err);
    }
}); 

module.exports = router;