import mongoose from 'mongoose';
import { ENV } from "../config/env.js";


export const connectDB = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URI);
        console.log("Database connected successfully ✅");        
    } catch (error) {
        console.log("Error connecting to the database ❎ ");
    }

}