import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";

import { users } from "../models/user.js";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "cc1adffae3677622fce019651a67dc4f",
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = users.findById(payload.id);
      if (user) return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
