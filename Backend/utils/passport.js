const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const bcrypt = require("bcrypt");
const User = require("../models/User");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ email: profile.emails?.[0].value });
                if (!user) {
                    const pass = Math.floor(Math.random() * 90000000 + 10000000);
                    const hashed = await bcrypt.hash(pass.toString(), 10);

                    user = new User({
                        name: profile.displayName,
                        email: profile.emails?.[0].value,
                        password: hashed,
                    });

                    await user.save();
                }

                const userWithTokens = {
                    ...user.toObject(),
                };
                return done(null, userWithTokens);
            } catch (err) {
                return done(err, undefined);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
