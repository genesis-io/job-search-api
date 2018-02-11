import * as  passport from 'passport';
import * as  local from 'passport-local';
import * as  jwt from 'passport-jwt';
import * as  GitHubStrategy from 'passport-github2';
import * as  bcrypt from 'bcrypt';

import db from '../../config/db';
import { getUserHelper } from '../../components/user/userSQLHelpers';

const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const localOptions = {
  usernameField: 'email',
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
};


passport.use(new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const { rows } = await db.queryAsync(getUserHelper({ email }));
    if (!rows.length) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    const passwordsMatch = await bcrypt.compare(password, rows[0].password)
    if (!passwordsMatch) {
      return done(null, false, { message: 'Incorrect password '});
    }
    return done(null, rows[0]);
  } catch(e) {
    return done(e);
  }
}));

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const { rows } = await db.queryAsync(getUserHelper({ email: jwt_payload.sub }));
    if (rows.length) {
      return done(null, rows[0]);
    } else {
      return done(null, false);
    }
  } catch(e) {
    return done(e);
  }
}));

export default passport;

// passport.use(new GitHubStrategy({
//     clientID: GITHUB_CLIENT_ID,
//     clientSecret: GITHUB_CLIENT_SECRET,
//     callbackURL: "http://127.0.0.1:3000/auth/github/callback"
//   },
//   (accessToken, refreshToken, profile, done) => {
//     // User.findOrCreate({ githubId: profile.id }, function (err, user) {
//     //   return done(err, user);
//     // });
//   }
// ));