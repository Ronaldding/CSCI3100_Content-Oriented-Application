const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");


// Update User
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json("User not found");
    }

    if (userId === id || user.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }

      try {
        await User.findByIdAndUpdate(id, { $set: req.body });
        return res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account or you must be an admin");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});
  

// Delete User
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json("User not found");
    }

    if (userId === id || user.isAdmin) {
      await User.findByIdAndDelete(id);
      return res.status(200).json("Account has been deleted");
    } else {
      return res.status(403).json("You can delete only your account or you must be an admin");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});
  
  
  //get a user
  router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


// Follow a user
router.put("/:id/follow", async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  if (userId !== id) {
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(userId);

      if (!user.followers.includes(userId)) {
        if (user.isPublic) {
          // If the account is public, follow the user directly
          await user.updateOne({ $push: { followers: userId } });
          await currentUser.updateOne({ $push: { followings: id } });
          res.status(200).json("User has been followed");
        } else {
          // If the account is private, send a follow request
          if (!user.followRequests.includes(userId)) {
            // Check if the user has already sent a follow request
            await user.updateOne({ $push: { followRequests: userId } });
            res.status(200).json("Follow request sent");
          } else {
            res.status(403).json("You have already sent a follow request");
          }
        }
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
});
// Accept follower request
router.put("/:id/accept-follower", async (req, res) => {
  const { followerId } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (user.followRequests.includes(followerId)) {
      // Remove followerId from followRequests array
      user.followRequests = user.followRequests.filter(
        (request) => request.toString() !== followerId
      );

      // Add followerId to followers array
      user.followers.push(followerId);

      await user.save();

      res.status(200).json("Follower request accepted");
    } else {
      res.status(404).json("Follower request not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
  //unfollow a user
  
  router.put("/:id/unfollow", async (req, res) => {
      if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).json("user has been unfollowed");
          } else {
            res.status(403).json("you dont follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant unfollow yourself");
      }
    });
// Block a user
router.put("/:id/block", async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const userToBlock = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!userToBlock.blockedUsers.includes(req.body.userId)) {
        await userToBlock.updateOne({ $push: { blockedUsers: req.body.userId } });
        res.status(200).json("User has been blocked");
      } else {
        res.status(403).json("You have already blocked this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cannot block yourself");
  }
});

// Unblock a user
router.put("/:id/unblock", async (req, res) => {
  try {
    const userToUnblock = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (userToUnblock.blockedUsers.includes(req.body.userId)) {
      await userToUnblock.updateOne({ $pull: { blockedUsers: req.body.userId } });
      res.status(200).json("User has been unblocked");
    } else {
      res.status(403).json("You have not blocked this user");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// Set account as public or not
router.put("/:id/public", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json("User not found");
    }

    const { isPublic } = req.body;

    user.isPublic = isPublic;
    await user.save();

    if (isPublic) {
      res.status(200).json("Account has been set as public");
    } else {
      res.status(200).json("Account has been set as private");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// Suspend a user
router.put("/:id/suspend", async (req, res) => {
  try {
    const adminUser = await User.findById(req.body.userId);
    if (!adminUser) {
      return res.status(404).json("Admin user not found");
    }

    if (adminUser.isAdmin) {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json("User not found");
      }

      user.suspended = req.body.suspended;
      user.suspensionReason = req.body.suspensionReason;
      await user.save();

      res.status(200).json("User has been suspended");
    } else {
      res.status(403).json("Only admins can suspend users");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// Unsuspend a user
router.put("/:id/unsuspend", async (req, res) => {
  try {
    const adminUser = await User.findById(req.body.userId);
    if (!adminUser) {
      return res.status(404).json("Admin user not found");
    }

    if (adminUser.isAdmin) {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json("User not found");
      }

      user.suspended = false;
      user.suspensionReason = "";
      await user.save();

      res.status(200).json("User has been unsuspended");
    } else {
      res.status(403).json("Only admins can unsuspend users");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;