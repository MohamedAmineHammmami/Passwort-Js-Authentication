import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const passportConfig = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, {
              success: false,
              msg: "User not found!",
            });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, {
              success: false,
              msg: "Invalid Credentials!",
            });
          }

          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
  //serialize user id into the passport session
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  //deserialize user from db by id stored in session
  //run at each subsequent request
  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return done(new Error("User not found!"));
      }
      done(null, user);
    } catch (err) {
      done(err.message);
    }
  });
};
