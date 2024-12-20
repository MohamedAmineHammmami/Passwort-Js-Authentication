import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

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

export const googleStrategyConfig = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const googleUser = await User.findOne({ googleId: profile.id });
          if (googleUser) {
            return done(null, googleUser);
          }
          //if the user already signUp with github
          const user = await User.findOne({
            email: profile.emails[0].value,
          });
          if (user?.githubId) {
            user.googleId = profile.id;
            await user.save();
            return done(null, user);
          }
          const newUser = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });
          await newUser.save();
          done(null, newUser);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};

export const githubStrategyConfig = (passport) => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const githubUser = await User.findOne({ githubId: profile.id });
          if (githubUser) {
            return done(null, githubUser);
          }
          //if the user already signUp with google
          const user = await User.findOne({
            email: profile.emails[0].value,
          });
          if (user?.googleId) {
            user.githubId = profile.id;
            await user.save();
            return done(null, user);
          }
          const newUser = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            githubId: profile.id,
          });
          await newUser.save();
          done(null, newUser);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
