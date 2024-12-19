import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Database connected!");
  } catch (err) {
    console.log(err.message);
  }
};
