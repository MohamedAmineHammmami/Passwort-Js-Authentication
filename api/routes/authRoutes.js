import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  login,
  register,
  logout,
  profile,
} from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/logout", logout);
authRouter.get("/profile", isAuthenticated, profile);

export default authRouter;
