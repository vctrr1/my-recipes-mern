import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRoutes.js";

dotenv.config();
const keyMongoDB = process.env.MONGODB_KEY;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

mongoose.connect(keyMongoDB);

app.listen(5100, () => console.log("Server Running"));
