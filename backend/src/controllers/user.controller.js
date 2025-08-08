import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import { clerkClient, getAuth } from "@clerk/express";

//get user profile by username
export const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });

  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ user });
});

//update user profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const user = await User.findOneAndUpdate({ clerkId: userId }, req.body, {
    new: true,
  });
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ user });
});

//sync user with Clerk
export const syncUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  //check if user already exists in db
  const existingUser = await User.findOne({ clerkId: userId });
  if (existingUser)
    return res
      .status(200)
      .json({ user: existingUser, message: "User already exists" });

  //if not, get user from Clerk
  const clerkUser = await clerkClient.users.getUser(userId);

  //create new user in db
  const newUser = await User.create({
    clerkId: userId,
    email: clerkUser.emailAddresses[0].emailAddress,
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    username: clerkUser.emailAddresses[0].emailAddress.split("@")[0],
    profilePicture: clerkUser.imageUrl || "",
  });

  const user = await User.create(newUser);
  res.status(201).json({ user, message: "User synced successfully" });
});

// Get current user for '/me'
export const currentUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const user = await User.findOne({ clerkId: userId });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ user });
});

// Follow or Unfollow user
export const followUser = asyncHandler(async(req,res)=>{
    const {userId} = getAuth(req);
    const {targetUserId} = req.params;

    // if user and target user same return error
    if(userId==targetUserId) return res.status(400).json({error:"You cannot follow yourself"}); 
    
    const currentUser= await User.findOne({clerkId:userId});
    const targetUser= await User.findOne({clerkId:targetUserId});

    // if user or target user cannot find return error
    if(!targetUser || !currentUser) return res.status(404).json({error:"User not found"});

    const isFollowing = currentUser.following.includes(targetUser);
    
    // if current user already following target user,unfollow them
    // If targetUser is not being followed, follow them. (create notification from current user to targetUser)
    if(isFollowing){
        await User.findByIdAndUpdate(currentUser._id,{
            $pull:{following:targetUserId}
        })
        await User.findByIdAndUpdate(targetUserId,{
            $pull:{followers:currentUser._id}
        })
    }
    else{
        await User.findByIdAndUpdate(currentUser._id,{
            $push:{following:targetUserId}
        })
        await User.findByIdAndUpdate(targetUserId,{
            $push:{followers:currentUser._id}
        })

        await Notification.create({
            from:currentUser._id,
            to:targetUserId,
            type:'follow'
        })
    }

    res.status(200).json({
        message:isFollowing?"User unfollowed":"User followed"
    });
    
})