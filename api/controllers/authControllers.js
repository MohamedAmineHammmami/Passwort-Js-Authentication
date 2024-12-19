import User from "../models/User.js";
import bcrypt from "bcrypt";
import { inputsValidation } from "../models/User.js";
import passport from "passport";

export const register = async (req, res) => {
  const checkInputs = await inputsValidation(req.body);
  const { username, email, password } = req.body;

  try {
    if (!checkInputs?.email) {
      return res.status(400).json({ success: false, msg: checkInputs.message });
    }
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exist!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ username, email, password: hash });
    await user.save();
    res
      .status(201)
      .json({ success: true, msg: "User was successfully registred." });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

export const login = async (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    //info represent the option param of done
    if (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
    if (!user) {
      return res.status(500).json({ success: false, msg: info.msg });
    }
    //login trigger serialization
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ success: false, err: err.message });
      }
      res
        .status(200)
        .json({ success: true, msg: "Welcome, you're logged in!" });
    });
  })(req, res, next);
};

export const logout = async (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
    res.status(200).json({ success: true, msg: "you're logged out!" });
  });
};

export const profile = async (req, res) => {
  res.send("profile");
};
