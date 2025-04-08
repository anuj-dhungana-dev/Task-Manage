import express from "express";
import { authentication } from "../middlewares/authentication.js";
import {
  addTask,
  allTask,
  deleteTask,
  updateTask,
} from "../controller/taskController.js";
const Router = express.Router();

//tasks routes
Router.get("/", authentication, allTask);
Router.post("/", authentication, addTask);
Router.put("/:id", authentication, updateTask);
Router.delete("/:id", authentication, deleteTask);

export default Router;
