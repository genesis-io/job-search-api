import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';
import GitHubStrategy from 'passport-github2';
import bcrypt from 'bcrypt';
import User from '../components/user/userController';

const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const localOptions = {
  usernameField: 'email',
}
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const user = await User.findUser(email)
    if (!user.length) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    const passwordsMatch = await bcrypt.compare(password, user[0].password)
    if (!passwordsMatch) {
      return done(null, false, { message: 'Incorrect password '});
    }
    return done(null, user);
  } catch(error) {
    return done(error);
  }
}))

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const user = await User.findUser(jwt_payload.sub);
    if (user.length) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch(e) {
    return done(e);
  }
}))


passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));