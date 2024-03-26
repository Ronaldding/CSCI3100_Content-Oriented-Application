
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

let User = require('../models/User');

mongoose.connect('mongodb://127.0.0.1:27017/3100projectgroup8');

// mongoose.connection.once('open', function(){
//     console.log("Connection is open...")
// }
    // let newUser = new User({
    //     userId: "karen_ngan3",
    //     email: "karenngan3@gmail.com"

    // });
    // newUser
    //     .save()
    //     .then(()=>{
    //         console.log("added")
    //     })
    //     .catch((error)=>{
    //         console.log("fail")
    //     })


//Follow a user
router.put("/search/:followId", async(req, res) => {
    try {
        if (req.body.userId == req.params.followId){
            res.status(403).set('Content-Type', 'text/plain').send("You cannot follow yourself");
        } else {
            const followUserId = await User.findOne({userId: req.params.followId})
            const currentUserId = await User.findOne({userId: req.body.userId})
            if(followUserId.followers.includes(req.params.userId)){
                res.status(403).set('Content-Type', 'text/plain').send("You have already followed this user");
            } else {
                await followUserId.updateOne({$push: {followers: req.body.userId} })
                await currentUserId.updateOne({$push: {followings: req.body.userId} })
                res.status(200).set('Content-Type', 'text/plain').send("Successful followed");

            }
        }
    } catch (error) {
    console.error(error);
    res.status(500).set('Content-Type', 'text/plain').send('Internal server error');
    }
});

module.exports = router;


