// routes/auth.js (modificado)
const express = require('express');
const passport = require('passport');
const router = express.Router();
const GoogleStrategy = require('passport-google-oidc');
const { getDB } = require('../db/index');
const { ObjectId } = require('mongodb');

// Serialización
passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    const db = getDB();
    const user = await db.collection('users').findOne({ 
      _id: new ObjectId(id) 
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Función para generar username único desde el email
function generateUsernameFromEmail(email) {
  if (!email) return `user${Date.now()}`;
  const baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${baseUsername}${Date.now().toString().slice(-4)}`;
}

// Estrategia de Google
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
      // Generar username único
      const email = profile.emails?.[0]?.value;
      let username = generateUsernameFromEmail(email);
      
      // Verificar que el username no exista
      let existingUser = await db.collection('users').findOne({ username });
      while (existingUser) {
        username = `${username}${Math.floor(Math.random() * 100)}`;
        existingUser = await db.collection('users').findOne({ username });
      }

      user = {
        googleId: profile.id,
        name: profile.displayName,
        email: email,
        username: username, // ¡Campo importante!
        avatar: profile.photos?.[0]?.value,
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

// Rutas OAuth (en raíz)
router.get('/login/federated/google', passport.authenticate('google'));

router.get('/oauth2/redirect/google', 
  passport.authenticate('google', { 
    failureRedirect: 'http://localhost:5173/login'
  }),
  (req, res) => {
    if (req.user) {
      req.session.username = req.user.username || req.user.name || 'Invitado';
      res.redirect('http://localhost:5173/');
    } else {
      res.redirect('http://localhost:5173/login');
    }
  }
);

// Rutas API (bajo /auth)
// GET /auth/user
router.get('/auth/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      _id: req.user._id,
      username: req.user.username || req.user.name,
      email: req.user.email,
      name: req.user.name
    });
  } else {
    res.status(401).json({ error: 'No autenticado' });
  }
});

// POST /auth/logout
router.post('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
    res.json({ message: 'Sesión cerrada correctamente' });
  });
});

module.exports = router;