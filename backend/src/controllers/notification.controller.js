import asyncHandler from "express-async-handler";
import { getAuth } from "@clerk/express";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  console.log("--USERID--",userId);
  
  const user = User.findOne({ clerkId: userId });
  if (!user) return res.status(404).json({ error: "User not found" });

  console.log("----USER----", user);

  const notifications = await Notification.find({ to: user._id })
    .sort({ createAt: -1 })
    .populate("from", "userName firstName lastName profilePicture")
    .populate("post", "content image")
    .populate("comment", "content");

  console.log("--NOTIFICATIONS---", notifications);

  res.status(200).json({ notifications });
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const notificationId = req.params;

  const user = User.findOne({ clerkId: userId });
  if (!user) return res.status(404).json({ error: "User not found" });

  const notification = Notification.findByIdAndDelete({
    _id: notificationId,
    to: user._id,
  });

  if (!notification) res.status(404).json({ error: "Notification not found" });

  res.status(200).json({ message: "Notification deleted" });
});
