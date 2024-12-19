import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./database/db.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
dbConnection();
app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
