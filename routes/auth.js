const express = require('express');
const passport = require('passport');
const router = express.Router();
const GoogleStrategy = require('passport-google-oidc');
const { getDB } = require('../db/index');

// Serialización simple
passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await getDB().collection('users').findOne({ _id: id });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Estrategia de Google simplificada
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/oauth2/redirect/google',
  scope: ['profile', 'email']
}, async (issuer, profile, done) => {
  try {
    const db = getDB();
    
    // Buscar usuario por googleId
    let user = await db.collection('users').findOne({ googleId: profile.id });
    
    // Si no existe, lo creamos
    if (!user) {
      user = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value,
        courses: [],
        createdAt: new Date()
      };
      const result = await db.collection('users').insertOne(user);
      user._id = result.insertedId;
    }
    
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Rutas
router.get('/login/federated/google', passport.authenticate('google'));
router.get('/oauth2/redirect/google', 
  passport.authenticate('google', { 
    successRedirect: '/',
    failureRedirect: '/login' 
  })
);

router.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/'));
  console.log('User logged out');
});

module.exports = router;