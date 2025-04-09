import express from "express";
import { logIn, logOut, Register } from "../controller/authController.js";
const Router = express.Router();

//Auth routes
Router.post("/register", Register);
Router.post("/login", logIn);
Router.get("/logout", logOut);

export default Router;
