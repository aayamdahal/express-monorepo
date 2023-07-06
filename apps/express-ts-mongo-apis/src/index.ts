require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import router from "../src/router/index";

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

mongoose.Promise = Promise;
mongoose.connect(
  process.env.MONGO_URL || "mongodb://localhost:27017/usermgmtdb"
);
mongoose.connection.on("error", (err: Error) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.use("/api", router);
