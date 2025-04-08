import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import sequelize from "./db/connectionDb.js";
import tasksRouter from "./routers/task.routes.js";
import authRouter from "./routers/auth.routes.js";

dotenv.config();
const app = express();

// Middleware for cookies and JSON parsing
app.use(cookieParser());
app.use(express.json());

// CORS setup for frontend connection
const corsOptions = {
  origin: process.env.CLIENT_URL, // Allow only the frontend URL
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // Allow cookies to be sent with requests
};
app.use(cors(corsOptions));

// Routes
app.use("/v1/api/auth", authRouter);
app.use("/v1/api/task", tasksRouter);


// Server listen
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
