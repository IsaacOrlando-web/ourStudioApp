const coursesRoutes = require('./coursesRoutes');
const authRoutes = require('./auth');
const myCoursesRoutes = require('./coursesUsersRoutes');
const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/authentication');

router.use('/', authRoutes);
router.use('/courses', coursesRoutes);
router.use('/my-courses', ensureAuth , myCoursesRoutes);
router.use('/',  (req, res) => res.render('./pages/login', {layout: './layouts/loginLayout'}));

module.exports = router;