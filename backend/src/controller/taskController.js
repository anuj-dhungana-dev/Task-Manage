import Task from "../db/models/task.model.js";
import User from "../db/models/user.model.js";

/**
 * @desc    Fetch all tasks for the authenticated user
 * @route   GET /v1/api/task
 */
export const allTask = async (req, res) => {
  try {
    const userId = req.userId;

    const tasks = await Task.findAll({ where: { userId } });

    if (!tasks.length) {
      return res.status(404).json({
        success: false,
        message: "No tasks found for this user",
      });
    }

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error(`Error in fetching tasks: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @desc    Add new task
 * @route   POST /v1/api/task
 */
export const addTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const normalizedpriority = priority?.trim().toLowerCase();
    const userId = req.userId;

    if (!title || !description || !normalizedpriority) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      userId,
    });

    res.status(201).json({
      success: true,
      message: "Task added successfully",
      task,
    });
  } catch (error) {
    console.error(`Error in adding task: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @desc    Update task
 * @route   PUT /v1/api/task/:id
 */
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const task = await Task.findOne({ where: { id, userId } });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.update(req.body);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error(`Error in updating task: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @desc    Delete task by ID
 * @route   DELETE /v1/api/task/:id
 */
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const task = await Task.findOne({ where: { id, userId } });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.destroy();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      task,
    });
  } catch (error) {
    console.error(`Error in deleting task: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
