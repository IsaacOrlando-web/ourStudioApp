const coursesRoutes = require('./coursesRoutes');
const myCoursesRoutes = require('./coursesUsersRoutes');
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/authentication');

// Rutas de cursos (públicas)
router.use('/courses', coursesRoutes);

// Rutas de mis cursos (privadas)
router.use('/my-courses', ensureAuth, myCoursesRoutes);

module.exports = router;