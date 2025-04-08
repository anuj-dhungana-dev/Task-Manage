import sequelize from "../connectionDb.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";
const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    priorty: {
      type: DataTypes.ENUM("high", "mid", "low"),
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "tasks",
    modelName: "Task",
    timestamps: true,
  }
);

// One-to-many relationship: A user can have many tasks.
//onDelete: "CASCADE" When a user is deleted, their tasks will also be deleted
User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });


export default Task;