import passport from "passport";
import bcrypt from "bcryptjs";

import { GraphQLLocalStrategy } from "graphql-passport";

import user from "../models/userModal.js";

export const configuePassport = async () => {
  passport.serializeUser((user, done) => {
    console.log("Serializing user")
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    console.log('Deserializing user')
    try {
      const user = await User.findById(id)
      done(null, user)
    } catch (err) {
      done(err)
    }
  })

  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false, { message: "Invalid username or password" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          return done(null, false, { message: "Invalid username or password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

}