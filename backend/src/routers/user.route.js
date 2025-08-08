import express from "express";
import {
  currentUser,
  followUser,
  getUserProfile,
  syncUser,
  updateProfile,
} from "../controllers/user.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

//public routes
router.get("/profile/:username", getUserProfile);

//protected routes
router.post("/sync", protectedRoute, syncUser);
router.get("/me", protectedRoute, currentUser);
router.put("/profile", protectedRoute, updateProfile);
router.post("/follow/:targetUserId", protectedRoute, followUser);



export default router;
