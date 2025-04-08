import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "task_manager",
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: Number(process.env.DB_PORT) || 3306,
    logging: false,
  }
);
const authenticateDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("DB connection error:", error);
  }
};
// synced
const syncDb = () => {
  try {
    sequelize.sync({ alter: true });
    console.log("Tables synced");
  } catch (error) {
    console.error("Sync error:", err);
  }
};

authenticateDb();
syncDb();
export default sequelize;
