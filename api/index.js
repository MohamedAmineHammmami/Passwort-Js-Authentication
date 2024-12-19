import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./database/db.js";
import authRouter from "./routes/authRoutes.js";
import session from "express-session";
import passport from "passport";
import { googleStrategyConfig, passportConfig } from "./config/passport.js";
import cors from "cors";

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
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
googleStrategyConfig(passport);

app.use("/api/auth", authRouter);

//google authentication
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: false }),
  (req, res) => {
    res.redirect("http://localhost:3000/profile");
  }
);

//error middlewares
app.use((req, res, next) => {
  const error = new Error(`path not found! ${req.originalUrl}`);
  res.status(404);
  next(error);
});
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ success: false, err: err.message });
});

dbConnection();
app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
