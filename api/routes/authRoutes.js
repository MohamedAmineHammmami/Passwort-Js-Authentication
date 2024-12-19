import { Router } from "express";
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
authRouter.get("/profile", profile);

export default authRouter;
