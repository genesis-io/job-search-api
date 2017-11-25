import passport from 'passport';
import local from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../components/user/userController';

const LocalStrategy = local.Strategy;
const localOptions = {
  usernameField: 'email',
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