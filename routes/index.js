const coursesRoutes = require('./coursesRoutes');
const authRoutes = require('./auth');
const myCoursesRoutes = require('./coursesUsersRoutes');
const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/authentication');

router.use('/', authRoutes);
router.use('/courses', coursesRoutes);
router.use('/my-courses', ensureAuth , myCoursesRoutes);
router.use('/',  (req, res) => res.send('Hello from the root route'));

module.exports = router;