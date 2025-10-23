import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

import { users } from "../models/user.js";
import { userGoogle } from "../models/userGoogle.js";

dotenv.config();

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => req.cookies?.oauthToken,
    ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]),
  secretOrKey: process.env.jwt_secret_key,
};

const googleOpts = {
  clientID: process.env.Google_Client_Id,
  clientSecret: process.env.Google_client_Secret,
  callbackURL: process.env.Callback_URL,
};

passport.use(
  new Strategy(jwtOpts, async (payload, done) => {
    try {
      var user = await users.findById(payload.id);
      if (!user) user = await userGoogle.findById(payload.id);
      console.log(user);
      if (user) return done(null, user);
      else return done(null, false);
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  new GoogleStrategy(googleOpts, async (token, tokenSecret, profile, done) => {
    try {
      const res = await userGoogle.findOne({ googleId: profile.id });
      if (res) return done(null, res);
      else {
        const OAuthUser = new userGoogle({
          googleId: profile.id,
          username: profile.emails[0].value,
        });
        const result = await OAuthUser.save();
        if (result) return done(null, result);
        else return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  })
);
