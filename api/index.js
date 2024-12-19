import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./database/db.js";
import authRouter from "./routes/authRoutes.js";
import session from "express-session";
import passport from "passport";
import { passportConfig } from "./config/passport.js";

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//session
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
//initialize passport
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.use("/api/auth", authRouter);
dbConnection();
app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
