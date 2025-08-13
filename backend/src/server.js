import express from "express";
import cors from "cors";
import {clerkMiddleware} from "@clerk/express";


import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

import userRoutes from './routers/user.route.js'
import postsRoutes from './routers/post.route.js'
import commentRoutes from './routers/comment.route.js'
import notificationRoutes from './routers/notification.route.js'
import { arcjetMiddleWare } from "./middleware/arcjet.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());
app.use(arcjetMiddleWare)

app.use("/api/users", userRoutes)
app.use("/api/posts", postsRoutes)
app.use("/api/comment", commentRoutes)
app.use("/api/notification", notificationRoutes)


app.get("/health",(req,res)=>{
  return res.status(200).json({message:"Running"})
})

app.use((err,req,res,next)=>{
  console.error("Unhandled error",err);
  res.status(500).json({error:err.message || "INTERNAL SERVER ERROR"})
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(ENV.PORT, () => {console.log("Server is running on port:", ENV.PORT);});
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
