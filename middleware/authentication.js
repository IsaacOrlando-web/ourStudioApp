// middleware/authentication.js
const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login/federated/google');
  }
};

const ensureGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    return next();
  }
};

// Nuevo middleware para verificar que el usuario es el dueño del recurso
const ensureCorrectUser = (req, res, next) => {
  if (req.isAuthenticated() && req.user.username === req.params.username) {
    return next();
  }
  res.status(403).json({ message: 'No tienes permiso para acceder a este recurso' });
};

module.exports = { ensureAuth, ensureGuest, ensureCorrectUser };